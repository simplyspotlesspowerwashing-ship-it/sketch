import { TUNING } from './tuning.ts';
import type { State } from './types.ts';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function voteParts(s: State) {
  const V = TUNING.vote, m = s.meters;
  return {
    people: (m.people - 50) * V.people, press: (m.press - 50) * V.press, business: (m.business - 50) * V.business,
    law: (m.law - 50) * V.law, treasury: (m.treasury - 50) * V.treasury,
    objectives: V.objective * s.objectivesDone.length, recalls: TUNING.recall.election * s.recalls, campaign: s.campaignVote,
  };
}

export function voteShare(s: State): number {
  const p = voteParts(s);
  return Math.round(clamp(TUNING.vote.base + Object.values(p).reduce((a, b) => a + b, 0), TUNING.vote.min, TUNING.vote.max));
}
