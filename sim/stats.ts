// Preview crowd data: plays a mixed population of bots and records what share picked each option.
// These are SIMULATED numbers. The UI labels them "preview data" and never presents them as real players.
//   node sim/stats.ts [terms=3000]  -> src/content/packs/week1.stats.json
import { writeFileSync } from 'node:fs';
import { week1Content as content } from '../src/content/index.ts';
import { autoplay, newTerm, reduce } from '../src/engine/engine.ts';
import { GROUPS } from '../src/engine/types.ts';
import { greedyApproval, peoplePleaser, random, sensible } from './bots.ts';

// Every simulated mayor does the town setup, cycling through the base groups and perks.
const PERKS = ['chest', 'friends', 'cousin'] as const;
const setup = (s: ReturnType<typeof newTerm>, i: number) =>
  reduce(s, { type: 'setup', profile: { mayor: 'Bot', town: 'Bad Town', base: GROUPS[i % 4]!, perk: PERKS[i % 3]! } }, content);

const N = Number(process.argv[2] ?? 3000);
const mix = [sensible, sensible, sensible, sensible, sensible, random, random, peoplePleaser, peoplePleaser, greedyApproval];
const cards: Record<string, number[]> = {};
const shares: number[] = [];
for (let i = 0; i < N; i++) {
  const end = autoplay(setup(newTerm(content.pack.id, `crowd-${i}`, content), i), mix[i % mix.length]!, content, () => false);
  shares.push(end.result!.share);
  for (const h of end.history) {
    if (typeof h.choice !== 'number' || h.cardId.startsWith('init:')) continue;
    (cards[h.cardId] ??= [])[h.choice] = ((cards[h.cardId] ?? [])[h.choice] ?? 0) + 1;
  }
}
const out: Record<string, number[]> = {};
for (const [id, counts] of Object.entries(cards)) {
  const total = counts.reduce((a, b) => a + (b ?? 0), 0);
  out[id] = Array.from(counts, (c) => Math.round((100 * (c ?? 0)) / total));
}
shares.sort((a, b) => a - b);
const sample = Array.from({ length: 101 }, (_, i) => shares[Math.min(shares.length - 1, Math.floor((i / 100) * shares.length))]!);
writeFileSync('src/content/packs/week1.stats.json', JSON.stringify({ simulated: true, terms: N, cards: out, sharePercentiles: sample }));
console.log(`wrote preview stats for ${Object.keys(out).length} cards from ${N} simulated terms`);
