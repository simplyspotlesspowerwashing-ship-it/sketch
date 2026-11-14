import type { TaxLevel } from './types.ts';

/** Every balance number in one place. Change here, re-run `npm run sim`, commit the report. */
export const TUNING = {
  startMoney: 100,
  startFavors: 2,
  favorCap: 5,
  startApproval: 50,
  actionsPerMonth: 3,
  deskSize: 4,
  lateCrisisFromMonth: 7, // from here a second URGENT card can land on the desk each month
  setup: { base: 8, rival: -4, chest: 30, friends: 2 },
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
  // Every group loses this much approval each month: the honeymoon fades. FADE env var overrides for experiments.
  fade: Number(globalThis.process?.env?.FADE ?? 5),
  // Rubber band: the fade grows by this much per approval point above 50 and shrinks below 50 (never under 0).
  fadeSlope: Number(globalThis.process?.env?.FADEK ?? 0.2),
  fadeMax: 7,
  urgentIgnoreScale: 2, // ignoring an URGENT (conditional) card hurts this many times more
  // Handover after Deputy Dave governs missed days: never worse than this.
  handover: { approvalFloor: 45, moneyFloor: 40, moneyCap: 90 },
  rareChance: 1 / 50,
  vote: { people: 0.5, press: 0.2, business: 0.1, law: 0.1, objective: 2, brokenPromise: -4, min: 5, max: 95 },
};
