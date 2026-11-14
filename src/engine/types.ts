// Engine and content types. Money is in $k everywhere (100 = $100,000).
// Signed deltas: money -20 costs $20k, favors -1 spends one Favor.

export const GROUPS = ['people', 'business', 'law', 'press'] as const;
export type GroupId = (typeof GROUPS)[number];
export type Effects = Partial<Record<GroupId, number>>;
export type CharacterId = string;
export type ProjectId = string;
export type TaxLevel = 'low' | 'medium' | 'high';
export type OptionKind = 'pay' | 'project' | 'promise' | 'refuse' | 'favor';

export interface Condition {
  flags?: string[];
  notFlags?: string[];
  projects?: ProjectId[];
  notProjects?: ProjectId[];
  min?: Effects; // group approval >= value
  max?: Effects; // group approval <= value
  fromMonth?: number; // term month 1..12
}

export interface Option {
  label: string;
  kind: OptionKind;
  money?: number;
  favors?: number;
  monthly?: number; // recurring money per month (leases), signed
  effects: Effects;
  project?: ProjectId;
  promise?: { dueIn: number; money: number };
  setFlag?: string;
  reaction: string;
  headlineTag?: string;
  campaign?: number; // Sunday campaign card only: added to vote share
}

export interface Card {
  id: string;
  who: CharacterId;
  group?: GroupId;
  text: string;
  day?: 1 | 2 | 3 | 4 | 5 | 6;
  month?: 1 | 2; // which of the day's two months
  requires?: Condition;
  options: Option[];
  ignored?: Effects & { setFlag?: string };
  advisors?: { who: CharacterId; line: string }[];
  rare?: boolean;
  secret?: boolean;
  repeatable?: boolean; // conditional cards fire once unless set
  draft?: boolean;
}

export interface ProjectDef {
  id: ProjectId;
  name: string;
  build: number; // cost in $k (positive)
  monthly: number; // signed: -2 upkeep, +5 income
  onBuild?: Effects;
  perMonth?: Effects;
  favorEvery?: number; // +1 Favor every N months owned
}

export interface ComboDef {
  id: string;
  name: string;
  projects: [ProjectId, ProjectId];
  text: string;
  money?: number;
  favors?: number;
  effects?: Effects;
}

export interface Objective {
  id: string;
  text: string;
  when: Condition;
}

export interface DaveOutcome {
  id: string;
  text: string;
  weight: number;
  money?: number;
  favors?: number;
  effects?: Effects;
}

export interface WeekPack {
  id: string;
  title: string;
  cards: Card[]; // desk cards: fixed (day+month), pool (neither), conditional (requires)
  events: Card[]; // one per day, `day` set
  campaign: Card[]; // first whose `requires` holds is used; last is the default
  objectives: Objective[]; // completing sets flag `obj:<id>` (secret cards require it)
  cliffhangers: string[];
  recallEndings: string[];
  dave: { outcomes: DaveOutcome[]; absence: string[] };
  headlines: { tag: string; text: string }[];
}

export interface Content {
  pack: WeekPack;
  projects: Record<ProjectId, ProjectDef>;
  combos: ComboDef[];
}

export type Phase = 'promises' | 'desk' | 'event' | 'report' | 'dayEnd' | 'campaign' | 'results';

export interface DeskSlot {
  cardId: string;
  status: 'open' | 'done' | 'dave' | 'ignored';
  urgent?: boolean; // conditional card: ignoring it hurts double
  option?: number;
}

export interface Promise_ {
  id: string;
  cardId: string;
  label: string;
  dueMonth: number;
  money: number;
  gain: Effects;
}

export interface MonthReport {
  month: number;
  income: number; // tax income after the Business penalty
  projects: number; // net project + lease money
  drift: Effects; // tax and project approval drift
  ignored: string[];
  favorsGained: number;
  combos: string[];
  objectives: string[];
  headline: string;
  recall?: string; // recall ending text if one fired this month
}

export interface HistoryEntry {
  month: number;
  cardId: string;
  choice: number | 'ignored' | 'dave';
  dave?: string;
}

export interface Result {
  share: number;
  won: boolean;
  parts: Record<GroupId | 'objectives' | 'promises' | 'recalls' | 'campaign', number>;
  endedEarly: boolean;
}

export interface State {
  v: 1;
  weekId: string;
  playerSeed: string;
  day: number; // 1..6 governing, 7 = Sunday
  month: number; // term month 1..12
  phase: Phase;
  money: number;
  favors: number;
  approval: Record<GroupId, number>;
  tax: TaxLevel;
  actionsLeft: number;
  boughtActionToday: boolean;
  delegatedThisMonth: boolean;
  protestNext: boolean;
  desk: DeskSlot[];
  eventId: string | null;
  projects: { id: ProjectId; builtMonth: number }[];
  leases: { cardId: string; monthly: number }[];
  promises: Promise_[];
  duePromises: string[]; // ids awaiting pay/break this month
  brokenPromises: number;
  recalls: number;
  lastRecall: string | null;
  flags: Record<string, true>;
  objectivesDone: string[];
  combosDone: string[];
  usedCards: string[];
  poolCursor: number;
  monthTags: string[];
  history: HistoryEntry[];
  reports: MonthReport[];
  polls: number[];
  campaignEffect: number;
  daveDays: number[]; // days Deputy Dave governed while the player was away
  result: Result | null;
}

export type Action =
  | { type: 'choose'; cardId: string; option: number } // desk, event or campaign card
  | { type: 'delegate'; cardId: string }
  | { type: 'buyAction' }
  | { type: 'setTax'; level: TaxLevel }
  | { type: 'resolvePromise'; id: string; pay: boolean }
  | { type: 'endDesk' }
  | { type: 'skipEvent' }
  | { type: 'next' }; // report -> next month / day end; dayEnd -> next day

/** Seeded random source: a key gives a reproducible stream of numbers in [0, 1). */
export type Rng = (key: string) => () => number;
