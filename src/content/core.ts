import type { ComboDef, ProjectDef } from '../engine/types.ts';

// Projects and combos are shared by every week. Numbers are starting points; tune with `npm run sim`.
export const PROJECTS: Record<string, ProjectDef> = {
  pond: { id: 'pond', name: 'Goose pond', build: 20, monthly: -2, perMonth: { people: 2 } },
  casino: { id: 'casino', name: 'Library casino', build: 30, monthly: 5, perMonth: { press: 2, people: -2 } },
  helicopter: { id: 'helicopter', name: 'Police helicopter', build: 40, monthly: -4, onBuild: { law: 10 } },
  spoon: { id: 'spoon', name: 'Giant spoon', build: 15, monthly: 3, onBuild: { press: 5 } },
  school: { id: 'school', name: 'New school', build: 50, monthly: -3, perMonth: { people: 2 } },
  tv: { id: 'tv', name: 'Town TV station', build: 25, monthly: -2, favorEvery: 2 },
};

export const COMBOS: ComboDef[] = [
  { id: 'vegasPd', name: 'Vegas PD', projects: ['casino', 'helicopter'], text: 'The helicopter now circles the casino with a spotlight. Tips are up.', money: 10, effects: { law: 5 } },
  { id: 'soupSeason', name: 'Soup Season', projects: ['spoon', 'pond'], text: 'Tourists think the pond is soup. Nobody corrects them.', money: 8, effects: { press: 5 } },
  { id: 'gooseNews', name: 'Goose News at Nine', projects: ['pond', 'tv'], text: 'Gerald gets his own show. Ratings are huge. Gerald is insufferable.', favors: 1, effects: { people: 5 } },
  { id: 'cardCounting', name: 'Advanced Maths', projects: ['school', 'casino'], text: 'The school teaches probability at the casino. Grades and winnings both rise.', money: 6, effects: { business: -5, people: 5 } },
];
