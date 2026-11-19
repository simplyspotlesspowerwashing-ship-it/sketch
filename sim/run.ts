// Balance simulator for the swipe engine. Plays whole terms with bots and writes a report.
//   npm run sim -- [terms=5000] [out=reports/balance.md]
import { writeFileSync } from 'node:fs';
import { packById } from '../src/content/index.ts';
const pack = packById(process.env.PACK ?? 'week1');
import { autoplay, davePolicy, findCard, newTerm, options } from '../src/engine/engine.ts';
import type { Policy } from '../src/engine/engine.ts';
import { TUNING } from '../src/engine/tuning.ts';
import { METERS } from '../src/engine/types.ts';
import type { Dir } from '../src/engine/types.ts';

const N = Number(process.argv[2] ?? 5000);
const OUT = process.argv[3] ?? 'reports/balance.md';

const random: Policy = (s, legal, _p, rand) => legal[Math.floor(rand() * legal.length)]!;
/** Sees the effects and steers every meter toward the middle, with some noise. Real players can't see effects, so they do worse. */
const sensible: Policy = (s, legal, p, rand) => {
  if (s.phase !== 'card') return legal[0]!;
  const card = findCard(p, s.current!);
  const risk = (d: Dir) => {
    const ch = card.options[d]!;
    let v = METERS.reduce((n, k) => { const x = s.meters[k] + (ch.effects[k] ?? 0); const dist = Math.abs(x - 50); return n + dist * dist / 50 + (x <= 8 || (k !== 'treasury' && x >= 92) ? 200 : 0); }, 0);
    v -= (ch.vote ?? 0) * 10 + (ch.effects.people ?? 0) * 0.4;
    return v + (rand() - 0.5) * 18;
  };
  return { type: 'swipe', dir: options(card).sort((a, b) => risk(a) - risk(b))[0]! };
};
const POLICIES: Record<string, Policy> = { random, 'dave-only': davePolicy, sensible };

const lines: string[] = [];
const seenAll = new Set<string>();
for (const [name, policy] of Object.entries(POLICIES)) {
  let wins = 0, recalled = 0, early = 0, cards = 0;
  const shares: number[] = [];
  const causes: Record<string, number> = {};
  for (let i = 0; i < N; i++) {
    const end = autoplay(newTerm(pack.id, `${name}-${i}`, pack), policy, pack, () => false);
    wins += end.result!.won ? 1 : 0;
    recalled += end.recalls > 0 ? 1 : 0;
    early += end.result!.endedEarly ? 1 : 0;
    cards += end.swipes.length;
    shares.push(end.result!.share);
    for (const c of end.recallCauses) causes[c] = (causes[c] ?? 0) + 1;
    for (const id of end.seen) seenAll.add(id);
  }
  shares.sort((a, b) => a - b);
  const q = (p: number) => shares[Math.floor(p * (shares.length - 1))];
  lines.push(`| ${name} | ${((100 * wins) / N).toFixed(1)}% | ${q(0.1)} / ${q(0.5)} / ${q(0.9)} | ${((100 * recalled) / N).toFixed(1)}% | ${((100 * early) / N).toFixed(1)}% | ${(cards / N).toFixed(0)} | ${Object.entries(causes).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(', ')} |`);
}
const unreached = pack.cards.filter((c) => !seenAll.has(c.id)).map((c) => c.id);
const report = [
  `# Balance report: ${pack.id}`, '', `${N} terms per policy, ${TUNING.cardsPerDay} cards a day.`, '',
  '| Policy | Win rate | Vote p10 / p50 / p90 | Recalled at least once | Term ended early | Cards played | Recall causes |', '|---|---|---|---|---|---|---|',
  ...lines, '', '## Cards never seen by any bot', '', ...(unreached.length ? unreached.map((x) => `- \`${x}\``) : ['None.']), '',
].join('\n');
writeFileSync(OUT, report);
console.log(report);
