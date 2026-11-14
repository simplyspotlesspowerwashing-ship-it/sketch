import type { TaxLevel } from './types.ts';

/** Every balance number in one place. Change here, re-run `npm run sim`, commit the report. */
export const TUNING = {
  startMoney: 100,
  startFavors: 2,
  favorCap: 5,
  startApproval: 50,
  actionsPerMonth: 2,
  months: 12,
  incomeBase: 10,
  incomePerBusiness: 0.2,
  tax: {
    low: { mult: 0.75, people: 2 },
    medium: { mult: 1.0, people: 0 },
    high: { mult: 1.3, people: -3 },
  } satisfies Record<TaxLevel, { mult: number; people: number }>,
  low: 35, // below: group penalty
  high: 85, // above: group pressure cards (content `requires`)
  pressFavorAt: 60,
  businessLowIncome: 0.7,
  pressLowPoll: -5,
  bankruptAt: -50,
  recall: { approval: 40, money: 20, election: -8, max: 2 },
  // Every group loses this much approval each month ("the honeymoon fades"). Not in the brief: 0 = off.
  // Proposed in reports/balance-m0.md as the fix for approval inflation; awaiting a decision.
  fade: Number(globalThis.process?.env?.FADE ?? 0),
  rareChance: 1 / 50,
  vote: { people: 0.5, press: 0.2, business: 0.1, law: 0.1, objective: 2, brokenPromise: -4, min: 5, max: 95 },
};
