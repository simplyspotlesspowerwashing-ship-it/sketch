// Prints a save whose Day 1 was won by steady play (for e2e/afterhours.cjs). Usage: node e2e/won-night.ts [lost]
import { packForWeek, weekIdFor } from '../src/content/index.ts';
import { findCard, newTerm, options, reduce } from '../src/engine/engine.ts';
import { METERS } from '../src/engine/types.ts';
import type { Dir, State } from '../src/engine/types.ts';
const pack = packForWeek(0);
const wantWin = process.argv[2] !== 'lost';
const pick = (s: State): Dir => {
  const c = findCard(pack, s.current!);
  let best: Dir = options(c)[0]!, score = Infinity;
  for (const d of options(c)) {
    const o = c.options[d]!;
    if (o.ending) continue;
    const v = METERS.reduce((a, m) => a + Math.abs(s.meters[m] + (o.effects?.[m] ?? 0) - 50), 0);
    if ((wantWin ? v : -v) < score) { score = wantWin ? v : -v; best = d; }
  }
  return best;
};
for (let i = 0; i < 200; i++) {
  let s = reduce(newTerm(weekIdFor(0), `e2e${i}`, pack), { type: 'setup', profile: { mayor: 'Test', folk: 'Bad Towners', base: 'people' } }, pack);
  while (s.phase === 'card') s = reduce(s, { type: 'swipe', dir: pick(s) }, pack);
  if (s.phase === 'recalled') s = reduce(s, { type: 'next' }, pack);
  if (s.phase === 'dayEnd' && s.won[0] === wantWin) {
    console.log(JSON.stringify({ schema: 1, state: s, playerSeed: `e2e${i}`, muted: true, introSeen: `${s.weekId}:1`, tutorialDone: true, dayOffset: 0, weeksDone: 0, dayDoneOn: '2000-01-01', scrapbook: [], deeds: [], onboarded: true, lastProfile: s.profile, met: [], counted: '' }));
    process.exit(0);
  }
}
console.error('no such night found'); process.exit(1);
