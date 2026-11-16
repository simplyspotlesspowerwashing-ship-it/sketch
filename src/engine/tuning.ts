/** Every balance number in one place. Change here, re-run `npm run sim`, commit the report. */
export const TUNING = {
  start: 50,
  cardsPerDay: 25,
  pressureGap: 6, // at least this many cards between pressure cards
  score: { perCard: 10, recall: 100 },
  low: 25, // warning zone (UI) below this
  high: 75, // warning zone (UI) above this
  recall: { reset: 40, election: -8, max: 2 },
  setupBase: 6,
  vote: { base: Number(globalThis.process?.env?.VBASE ?? 31), people: 0.5, press: 0.2, business: 0.15, law: 0.15, treasury: 0.1, objective: 3, min: 5, max: 95 },
  handover: { floor: 35, ceiling: 65 }, // after Randy covers missed days
};
