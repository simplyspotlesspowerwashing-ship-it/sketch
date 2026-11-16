// Swipe-card engine types. One card at a time; each option is a swipe direction.

export const GROUPS = ['people', 'business', 'law', 'press'] as const;
export type GroupId = (typeof GROUPS)[number];
export const METERS = [...GROUPS, 'treasury'] as const;
export type MeterId = (typeof METERS)[number];
export type Effects = Partial<Record<MeterId, number>>;
export type Dir = 'left' | 'right' | 'up' | 'down';
export const DIRS: Dir[] = ['left', 'right', 'up', 'down'];

export interface Condition {
  flags?: string[]; // all must be set
  any?: string[]; // at least one must be set
  not?: string[]; // none may be set
  min?: Effects; // meter >= value
  max?: Effects; // meter <= value
  fromDay?: number;
}

/** The clip that plays after a choice: an act (the choreography) and its props (emoji), e.g. build + pond, goose. */
export interface Clip { act: string; props: string[]; word?: string }
export interface Choice {
  clip?: Clip;
  label: string; // max 30
  effects: Effects;
  reaction: string; // what the character says after, max 100
  set?: string[]; // flags to set
  clear?: string[]; // flags to clear
  /** Follow-up cards: [cardId, cards from now]. This is how stories continue. */
  then?: [string, number][];
  vote?: number; // Sunday campaign card only: added to the vote share
}

export interface Card {
  id: string;
  who: string;
  text: string; // max 150
  story?: string; // which storyline this belongs to (for the day's review)
  /** Pinned to a day: shown as that day's first cards, in order, to every mayor. */
  day?: number;
  /** With `day`: the position in that day's run (0-based) instead of the start. */
  slot?: number;
  /** A tense one-button moment: hold to wind up, release while they're not looking. Success = right, caught = left. */
  sneak?: boolean;
  requires?: Condition;
  weight?: number; // in the open pool; default 1
  repeat?: boolean; // may be drawn more than once
  followUp?: boolean; // only appears when scheduled by a choice
  options: Partial<Record<Dir, Choice>>;
}

export interface Ending { title: string; text: string }

export interface Objective { id: string; text: string; when: Condition }

export interface Pack {
  id: string;
  title: string;
  cards: Card[];
  campaign: Card[]; // Sunday: first whose condition holds; options carry a vote bonus in `effects.people`-free form via `vote`
  objectives: Objective[];
  endings: Record<string, Ending>; // low:<meter>, high:<group>, term:won|landslide|lost|early
  headlines: Record<string, string>; // story id -> headline for the day's review
  cliffhangers: string[];
}

export type Phase = 'card' | 'recalled' | 'dayEnd' | 'results';

export interface Swipe { day: number; cardId: string; dir: Dir; before: Record<MeterId, number>; after: Record<MeterId, number> }

export interface Result { share: number; won: boolean; endedEarly: boolean }

/** The town is always Bad Town; the player names their mayor and what the townsfolk are called. */
export interface Profile { mayor: string; folk: string; base: GroupId }

export interface State {
  v: 9;
  weekId: string;
  playerSeed: string;
  day: number; // 1..6 governing, 7 = Sunday
  cardInDay: number;
  count: number; // cards played this term
  meters: Record<MeterId, number>;
  flags: Record<string, true>;
  queue: { cardId: string; at: number }[]; // scheduled follow-ups
  seen: string[];
  current: string | null;
  phase: Phase;
  dayStart: Record<MeterId, number>;
  swipes: Swipe[];
  recalls: number;
  recallCauses: string[];
  recalledDays: number[];
  objectivesDone: string[];
  campaignVote: number;
  profile: Profile | null;
  daveDays: number[];
  polls: number[];
  result: Result | null;
}

export type Action =
  | { type: 'swipe'; dir: Dir }
  | { type: 'next' } // recalled -> dayEnd, dayEnd -> next day
  | { type: 'setup'; profile: Profile }
  | { type: 'rename'; mayor: string; folk: string };

export type Rng = (key: string) => () => number;
