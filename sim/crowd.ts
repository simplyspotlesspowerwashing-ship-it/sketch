// Preview crowd data: a mixed population of simulated mayors plays the week, and we record what
// share of them swiped each way on every card. SIMULATED: the UI labels it "preview data".
//   node sim/crowd.ts [terms=3000]  -> src/content/packs/<PACK>.crowd.json  (PACK=week2 node sim/crowd.ts)
import { writeFileSync } from 'node:fs';
import { packById } from '../src/content/index.ts';
const pack = packById(process.env.PACK ?? 'week1');
import { autoplay, davePolicy, findCard, newTerm, options } from '../src/engine/engine.ts';
import type { Policy } from '../src/engine/engine.ts';
import { METERS } from '../src/engine/types.ts';
import type { Dir } from '../src/engine/types.ts';

const N = Number(process.argv[2] ?? 3000);
// Real players can't see effects, so most of the crowd here reads the card loosely: a lean toward
// the option that helps the most-loved-feeling group, plus a strong taste for the first option.
const typical: Policy = (s, legal, p, rand) => {
  if (s.phase !== 'card') return legal[0]!;
  const card = findCard(p, s.current!);
  const dirs = options(card);
  const score = (d: Dir) => { const e = card.options[d]!.effects; return METERS.reduce((n, k) => n + (e[k] ?? 0) * (k === 'people' ? 1.4 : 1), 0) + (d === 'right' ? 6 : d === 'left' ? 3 : 0) + (rand() - 0.5) * 30; };
  return { type: 'swipe', dir: dirs.sort((a, b) => score(b) - score(a))[0]! };
};
const chaos: Policy = (_s, legal, _p, rand) => legal[Math.floor(rand() * legal.length)]!;
const mix: Policy[] = [typical, typical, typical, typical, typical, typical, davePolicy, davePolicy, chaos, chaos];
const counts: Record<string, Partial<Record<Dir, number>>> = {};
for (let i = 0; i < N; i++) {
  const end = autoplay(newTerm(pack.id, `crowd-${i}`, pack), mix[i % mix.length]!, pack, () => false);
  for (const w of end.swipes) { const c = (counts[w.cardId] ??= {}); c[w.dir] = (c[w.dir] ?? 0) + 1; }
}
const out: Record<string, Partial<Record<Dir, number>>> = {};
for (const [id, c] of Object.entries(counts)) {
  const total = Object.values(c).reduce((a, b) => a + (b ?? 0), 0);
  out[id] = Object.fromEntries(Object.entries(c).map(([d, n]) => [d, Math.round((100 * (n ?? 0)) / total)]));
}
writeFileSync(`src/content/packs/${pack.id}.crowd.json`, JSON.stringify({ simulated: true, terms: N, cards: out }));
console.log(`preview crowd data for ${Object.keys(out).length} of ${pack.cards.length} cards from ${N} simulated terms`);
