import { TUNING } from './tuning.ts';
import type { Result, State } from './types.ts';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Vote share breakdown. Used for the daily poll (campaign 0) and the election. */
export function voteParts(s: State, campaign = s.campaignEffect): Result['parts'] {
  const V = TUNING.vote;
  return {
    people: (s.approval.people - 50) * V.people,
    press: (s.approval.press - 50) * V.press + (s.approval.press < TUNING.low ? TUNING.pressLowPoll : 0),
    business: (s.approval.business - 50) * V.business,
    law: (s.approval.law - 50) * V.law,
    objectives: V.objective * s.objectivesDone.length,
    promises: V.brokenPromise * s.brokenPromises,
    recalls: TUNING.recall.election * s.recalls,
    campaign,
  };
}

export function voteShare(s: State, campaign = s.campaignEffect): number {
  const p = voteParts(s, campaign);
  const total = 50 + p.people + p.press + p.business + p.law + p.objectives + p.promises + p.recalls + p.campaign;
  return Math.round(clamp(total, TUNING.vote.min, TUNING.vote.max));
}
