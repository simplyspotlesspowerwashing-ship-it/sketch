/** Every balance number in one place. Change here, re-run `npm run sim`, commit the report. */
export const TUNING = {
  start: 50,
  cardsPerDay: 20,
  defer: { perDay: 2, back: 3, lastSlots: 4 }, // 'Not now': twice a day, the card returns 3 cards later; not in the last 4 cards of the day
  pressureGap: 6, // at least this many cards between pressure cards
  score: { calm: 5, uneasy: 15, steadyFinish: 30, recall: 100 }, // balance scoring: distance from 50 for 2 points, for 1 point; bonus for ending the day steady
  low: 25, // warning zone (UI) below this
  high: 75, // warning zone (UI) above this
  recall: { reset: 40 }, // after a night you lose (recall, rare ending or voted out), you run again: everything restarts here
  setupBase: 6,
  // Every night is a re-election: vote = base + perPoint x today's score + goal x weekly goals met. 50% keeps the job.
  vote: { base: Number(globalThis.process?.env?.VBASE ?? 13), perPoint: Number(globalThis.process?.env?.VPP ?? 0.2), objective: Number(globalThis.process?.env?.VOBJ ?? 5), min: 5, max: 95, pass: 50 },
  handover: { floor: 35, ceiling: 65 }, // after Randy covers missed days
};
