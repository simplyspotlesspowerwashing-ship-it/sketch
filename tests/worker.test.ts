import { describe, expect, it } from 'vitest';
import worker from '../worker/src/index.ts';
import type { D1, Env } from '../worker/src/index.ts';

/** An in-memory stand-in for the votes table. */
function fakeDB(): D1 & { rows: Map<string, number> } {
  const rows = new Map<string, number>();
  return {
    rows,
    prepare(sql: string) {
      return {
        bind(...v: unknown[]) {
          return {
            async run() { if (sql.startsWith('INSERT')) { const k = v.slice(0, 4).join('|'); rows.set(k, (rows.get(k) ?? 0) + 1); } return {}; },
            async all<T>() { const [pack, week] = v; const results = [...rows].filter(([k]) => k.startsWith(`${pack}|${week}|`)).map(([k, n]) => { const [, , card, dir] = k.split('|'); return { card, dir, n }; }); return { results: results as T[] }; },
          };
        },
      };
    },
  };
}
const env = (): Env & { DB: ReturnType<typeof fakeDB> } => ({ DB: fakeDB(), ALLOWED_ORIGIN: 'https://badtown.example' });
const vote = (e: Env, body: unknown) => worker.fetch(new Request('https://stats/vote', { method: 'POST', body: JSON.stringify(body), headers: { origin: 'https://badtown.example' } }), e);

describe('stats worker', () => {
  it('counts votes and reports them per card', async () => {
    const e = env();
    for (let i = 0; i < 3; i++) expect((await vote(e, { pack: 'week1', week: '2026-11-16', card: 'g1', dir: 'right' })).status).toBe(204);
    await vote(e, { pack: 'week1', week: '2026-11-16', card: 'g1', dir: 'left' });
    await vote(e, { pack: 'week1', week: '2026-11-23', card: 'g1', dir: 'left' });
    const res = await worker.fetch(new Request('https://stats/crowd?pack=week1&week=2026-11-16'), e);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ cards: { g1: { left: 1, right: 3 } } });
  });
  it('rejects anything that is not a clean vote', async () => {
    const e = env();
    for (const bad of [{ pack: 'week1', week: '2026-11-16', card: 'g1', dir: 'up' }, { pack: 'week1', week: 'monday', card: 'g1', dir: 'left' }, { pack: 'x;drop', week: '2026-11-16', card: 'g1', dir: 'left' }, 'nope']) {
      expect((await vote(e, bad)).status, JSON.stringify(bad)).toBe(400);
    }
    expect(e.DB.rows.size).toBe(0);
  });
  it('answers CORS preflight for the game\'s origin', async () => {
    const res = await worker.fetch(new Request('https://stats/vote', { method: 'OPTIONS', headers: { origin: 'https://badtown.example' } }), env());
    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe('https://badtown.example');
  });
});
