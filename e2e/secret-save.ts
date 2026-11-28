// Prints a save where the week's secret character is about to appear (for e2e checks). Usage: node e2e/secret-save.ts [week 1-4]
import { PACKS, weekIdFor } from '../src/content/index.ts';
import { findCard, newTerm, options, reduce } from '../src/engine/engine.ts';
import { METERS } from '../src/engine/types.ts';
import type { Dir, State } from '../src/engine/types.ts';
const w = Number(process.argv[2] ?? 1) - 1;
const p = PACKS[w]!;
const steady = (s: State): Dir => {
  const c = findCard(p, s.current!);
  let best = options(c)[0]!, score = Infinity;
  for (const d of options(c)) { const o = c.options[d]!; if (o.ending) continue; const v = METERS.reduce((a, m) => a + Math.abs(s.meters[m] + (o.effects?.[m] ?? 0) - 50), 0); if (v < score) { score = v; best = d; } }
  return best;
};
for (let i = 0; i < 50; i++) {
  let s = reduce(newTerm(weekIdFor(w), `sec${i}`, p), { type: 'setup', profile: { mayor: 'Test', folk: 'Bad Towners', base: 'people' } }, p);
  for (let n = 0; n < 200 && s.phase !== 'results' && s.current !== p.secret!.start; n++) {
    if (s.phase !== 'card') { s = reduce(s, { type: 'next' }, p); continue; }
    const c = findCard(p, s.current!);
    const k = c.day === s.day ? (c.slot === 0 ? 0 : c.slot === 7 ? 1 : null) : null;
    s = reduce(s, { type: 'swipe', dir: k !== null ? p.secret!.rule[k] : steady(s) }, p);
  }
  if (s.current === p.secret!.start) {
    console.log(JSON.stringify({ schema: 1, state: s, playerSeed: `sec${i}`, muted: true, introSeen: `${s.weekId}:${s.day}`, tutorialDone: true, dayOffset: 0, weeksDone: w, dayDoneOn: '', scrapbook: [], deeds: [], onboarded: true, lastProfile: s.profile, met: ['randy', 'gerald'], counted: '' }));
    process.exit(0);
  }
}
console.error('no run found'); process.exit(1);
