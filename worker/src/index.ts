// Mayor of Bad Town: crowd stats. A Cloudflare Worker with one D1 table of anonymous yes/no counts.
//   POST /vote   {"pack":"week1","week":"2026-11-16","card":"g1","dir":"right"}  -> 204
//   GET  /crowd?pack=week1&week=2026-11-16                                     -> {"cards":{"g1":{"left":12,"right":30}}}
// No cookies, no IDs, no IP addresses stored: only how many mayors answered each card each way.

/** The parts of D1 this worker uses (so it needs no extra type packages). */
export interface D1 {
  prepare(sql: string): { bind(...v: unknown[]): { run(): Promise<unknown>; all<T>(): Promise<{ results: T[] }> } };
}
export interface Env { DB: D1; ALLOWED_ORIGIN?: string }

const ID = /^[A-Za-z0-9_-]{1,40}$/;
const WEEK = /^(\d{4}-\d{2}-\d{2}|r\d{1,3})$/; // a calendar week, or a round of the four weekly packs (r0 = everyone's first time through)

function cors(env: Env, req: Request): Record<string, string> {
  const allowed = (env.ALLOWED_ORIGIN ?? '*').split(',').map((s) => s.trim());
  const origin = req.headers.get('origin') ?? '';
  const allow = allowed.includes('*') ? '*' : allowed.includes(origin) ? origin : allowed[0]!;
  return { 'access-control-allow-origin': allow, 'access-control-allow-methods': 'GET, POST, OPTIONS', 'access-control-allow-headers': 'content-type', 'access-control-max-age': '86400', vary: 'origin' };
}
const json = (body: unknown, status: number, headers: Record<string, string>) => new Response(JSON.stringify(body), { status, headers: { ...headers, 'content-type': 'application/json' } });

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const h = cors(env, req);
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });

    if (req.method === 'POST' && url.pathname === '/vote') {
      let b: { pack?: unknown; week?: unknown; card?: unknown; dir?: unknown };
      try { b = await req.json(); } catch { return json({ error: 'bad json' }, 400, h); }
      const { pack, week, card, dir } = b;
      if (typeof pack !== 'string' || !ID.test(pack) || typeof week !== 'string' || !WEEK.test(week) || typeof card !== 'string' || !ID.test(card) || (dir !== 'left' && dir !== 'right')) return json({ error: 'bad vote' }, 400, h);
      await env.DB.prepare('INSERT INTO votes (pack, week, card, dir, n) VALUES (?1, ?2, ?3, ?4, 1) ON CONFLICT (pack, week, card, dir) DO UPDATE SET n = n + 1').bind(pack, week, card, dir).run();
      return new Response(null, { status: 204, headers: h });
    }

    if (req.method === 'GET' && url.pathname === '/crowd') {
      const pack = url.searchParams.get('pack') ?? '', week = url.searchParams.get('week') ?? '';
      if (!ID.test(pack) || !WEEK.test(week)) return json({ error: 'bad query' }, 400, h);
      const { results } = await env.DB.prepare('SELECT card, dir, n FROM votes WHERE pack = ?1 AND week = ?2').bind(pack, week).all<{ card: string; dir: 'left' | 'right'; n: number }>();
      const cards: Record<string, { left: number; right: number }> = {};
      for (const r of results) (cards[r.card] ??= { left: 0, right: 0 })[r.dir] = r.n;
      return json({ cards }, 200, { ...h, 'cache-control': 'public, max-age=60' });
    }

    if (url.pathname === '/') return json({ ok: true, service: 'bad-town-stats' }, 200, h);
    return json({ error: 'not found' }, 404, h);
  },
};
