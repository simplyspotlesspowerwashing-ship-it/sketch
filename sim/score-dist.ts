// Day-score distribution by play style, used to set the day titles (TIERS) in score.ts.
//   npm run scores -- [terms=300]
import { PACKS } from '../src/content/index.ts';
import { autoplay, davePolicy, findCard, newTerm, options } from '../src/engine/engine.ts';
import type { Policy } from '../src/engine/engine.ts';
import { dayScore, tierOf } from '../src/engine/score.ts';
import { METERS } from '../src/engine/types.ts';
import type { Dir } from '../src/engine/types.ts';

const N = Number(process.argv[2] ?? 300);
const random: Policy = (s, legal, _p, rand) => legal[Math.floor(rand() * legal.length)]!;
/** Sees effects (real players can't) and steers toward the middle, with noise `k`. */
const steer = (k: number): Policy => (s, legal, p, rand) => {
  if (s.phase !== 'card') return legal[0]!;
  const card = findCard(p, s.current!);
  const risk = (d: Dir) => METERS.reduce((n, m) => { const x = s.meters[m] + (card.options[d]!.effects[m] ?? 0); return n + (m === 'treasury' && x > 50 ? 0 : (x - 50) ** 2 / 50); }, 0) + (rand() - 0.5) * k;
  return { type: 'swipe', dir: options(card).sort((a, b) => risk(a) - risk(b))[0]! };
};
const POL: Record<string, Policy> = { random, 'randy-autopilot': davePolicy, 'half-careful': steer(120), careful: steer(15) };
const q = (xs: number[], p: number) => xs[Math.min(xs.length - 1, Math.floor(p * xs.length))]!;
for (const pack of PACKS) for (const [name, pol] of Object.entries(POL)) {
  const totals: number[] = []; const tiers: Record<string, number> = {};
  for (let i = 0; i < N; i++) {
    const end = autoplay(newTerm(pack.id, `${name}-${i}`, pack), pol, pack, () => false);
    for (let d = 1; d <= 6; d++) { if (!end.swipes.some((w) => w.day === d)) continue; const t = dayScore(end, d).total; totals.push(t); const n = tierOf(t).name; tiers[n] = (tiers[n] ?? 0) + 1; }
  }
  totals.sort((a, b) => a - b);
  const pct = (n: number) => `${Math.round((100 * n) / totals.length)}%`;
  console.log(`${pack.id} ${name.padEnd(13)} p10 ${q(totals, .1)} p50 ${q(totals, .5)} p90 ${q(totals, .9)} max ${totals.at(-1)} | ${Object.entries(tiers).map(([k, v]) => `${k} ${pct(v)}`).join(', ')}`);
}
