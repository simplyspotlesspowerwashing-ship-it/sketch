/** Every balance number in one place. Change here, re-run `npm run sim`, commit the report. */
export const TUNING = {
  start: 50,
  cardsPerDay: 20,
  pressureGap: 6, // at least this many cards between pressure cards
  score: { calm: 5, uneasy: 15, steadyFinish: 30, recall: 100 }, // balance scoring: distance from 50 for 2 points, for 1 point; bonus for ending the day steady
  low: 25, // warning zone (UI) below this
  high: 75, // warning zone (UI) above this
  recall: { reset: 40 }, // after a night you lose (recall, rare ending or voted out), you run again: everything restarts here
  setupBase: 6,
  // Every night is a re-election: vote = base + perPoint x today's score + goal x weekly goals met. 50% keeps the job.
  vote: { base: Number(globalThis.process?.env?.VBASE ?? 20), perPoint: Number(globalThis.process?.env?.VPP ?? 0.2), objective: 3, min: 5, max: 95, pass: 50 },
  handover: { floor: 35, ceiling: 65 }, // after Randy covers missed days
};
