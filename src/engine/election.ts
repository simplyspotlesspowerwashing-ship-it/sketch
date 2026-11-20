import { dayScore } from './score.ts';
import { TUNING } from './tuning.ts';
import { GROUPS } from './types.ts';
import type { State } from './types.ts';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Tonight's vote share: how well you kept the town balanced today, plus this week's goals met. */
export function voteParts(s: State, day = s.day) {
  const V = TUNING.vote;
  return { day: V.perPoint * dayScore(s, day).total, goals: V.objective * s.objectivesDone.length };
}
export function nightVote(s: State, day = s.day): number {
  const p = voteParts(s, day);
  return Math.round(clamp(TUNING.vote.base + p.day + p.goals, TUNING.vote.min, TUNING.vote.max));
}
/** The group that liked you least tonight: who you get blamed on when you're voted out. */
export function weakest(s: State): string {
  return [...GROUPS].sort((a, b) => s.meters[a] - s.meters[b])[0]!;
}
