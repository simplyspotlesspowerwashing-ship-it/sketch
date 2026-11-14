import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { sensible } from '../sim/bots.ts';
import { week1Content } from '../src/content/index.ts';
import { loadPack } from '../src/content/schema.ts';
import week1 from '../src/content/packs/week1.json' with { type: 'json' };
import { coverMissedDays, davePolicy } from '../src/engine/dave.ts';
import { voteShare } from '../src/engine/election.ts';
import { autoplay, botchCost, fadeFor, findCard, legalActions, newTerm, reduce } from '../src/engine/engine.ts';
import { TUNING } from '../src/engine/tuning.ts';
import type { Action, State } from '../src/engine/types.ts';

// Monday's shared event is removed so month-end tests reach the report directly; events are tested on their own.
const content = { ...week1Content, pack: { ...week1Content.pack, events: week1Content.pack.events.filter((e) => e.day !== 1) } };

// The rule tests check exact numbers, so the monthly approval fade is switched off for them and tested on its own.
const fade = { base: TUNING.fade, slope: TUNING.fadeSlope };
beforeAll(() => { TUNING.fade = 0; TUNING.fadeSlope = 0; });
afterAll(() => { TUNING.fade = fade.base; TUNING.fadeSlope = fade.slope; });

const start = (seed = 'p1') => newTerm('week1', seed, content);
const play = (s: State, ...actions: Action[]) => actions.reduce((st, a) => reduce(st, a, content), s);
/** A state with a chosen desk, so tests do not depend on the shared draw order. */
const withDesk = (s: State, ...ids: string[]): State => ({ ...s, desk: ids.map((cardId) => ({ cardId, status: 'open' as const })) });

describe('setup and determinism', () => {
  it("starts with the brief's numbers and three cards that must all be dealt with", () => {
    const s = start();
    expect(s.money).toBe(100);
    expect(s.favors).toBe(2);
    expect(s.approval).toEqual({ people: 50, business: 50, law: 50, press: 50 });
    expect(s.phase).toBe('desk');
    expect(s.desk).toHaveLength(3);
  });
  it('gives every player the same desk', () => {
    expect(start('alice').desk).toEqual(start('bob').desk);
  });
  it('is reproducible for the same player', () => {
    expect(autoplay(start('same'), davePolicy, content, () => false)).toEqual(autoplay(start('same'), davePolicy, content, () => false));
  });
  it('does not mutate the input state, and rejects illegal actions', () => {
    const s = start();
    const copy = structuredClone(s);
    reduce(s, { type: 'endDesk' }, content);
    expect(s).toEqual(copy);
    expect(() => reduce(s, { type: 'next' }, content)).toThrow(/illegal/);
  });
  it('every desk card has a mini-game and an option that is free up front', () => {
    for (const c of week1Content.pack.cards) {
      expect(c.game, c.id).toBeTruthy();
      expect(c.options.some((o) => !((o.money ?? 0) < 0) && !((o.favors ?? 0) < 0) && !o.project), c.id).toBe(true);
    }
  });
});

describe('desk', () => {
  it('there is no action limit: every card can be dealt with', () => {
    let s = withDesk(start(), 'snowplow', 'curfew', 'festival');
    s = play(s, { type: 'choose', cardId: 'snowplow', option: 2, skill: 2 }, { type: 'choose', cardId: 'curfew', option: 0, skill: 2 }, { type: 'choose', cardId: 'festival', option: 2, skill: 2 });
    expect(s.desk.every((d) => d.status === 'done')).toBe(true);
    expect(s.money).toBe(82);
    expect(s.approval.law).toBe(60);
  });
  it('a clean game gives exactly the chosen trade; sloppy and flop only make it worse', () => {
    const run = (skill: 0 | 1 | 2) => play(withDesk(start(), 'pothole'), { type: 'choose', cardId: 'pothole', option: 0, skill });
    expect(run(2).money).toBe(86);
    expect(run(2).approval).toEqual({ people: 55, business: 55, law: 50, press: 50 });
    expect(run(1).money).toBe(86);
    expect(run(1).approval.people).toBe(50); // pothole has no group, so the penalty lands on People
    expect(run(0).money).toBe(81);
    expect(run(0).approval.people).toBe(45);
    for (const skill of [0, 1] as const) {
      const c = botchCost(findCard(content, 'pothole'), skill);
      expect(c.money).toBeLessThanOrEqual(0);
      expect(Object.values(c.effects).every((v) => v < 0)).toBe(true);
    }
  });
  it('a bad job on an urgent card costs double', () => {
    const base = start();
    const s = play({ ...base, desk: [{ cardId: 'gooseOccupation', status: 'open', urgent: true }] }, { type: 'choose', cardId: 'gooseOccupation', option: 0, skill: 0 });
    expect(s.approval.people).toBe(50 + 5 - 20);
  });
  it('sending Dave costs a Favor and plays no game', () => {
    let s = withDesk(start(), 'snowplow', 'curfew', 'festival');
    s = play(s, { type: 'delegate', cardId: 'curfew' }, { type: 'delegate', cardId: 'festival' });
    expect(s.favors).toBe(0);
    expect(s.desk[1]!.status).toBe('dave');
    expect(legalActions(s, content).some((a) => a.type === 'delegate')).toBe(false);
  });
  it('injects the escalation card once its flag is set', () => {
    let s = withDesk(start(), 'goosePond');
    s = play(s, { type: 'choose', cardId: 'goosePond', option: 2, skill: 2 }, { type: 'endDesk' }, { type: 'next' }, { type: 'skipInitiative' });
    expect(s.month).toBe(2);
    expect(s.desk.find((d) => d.cardId === 'gooseOccupation')?.urgent).toBe(true);
  });
  it('blocks building the same project twice and spending Favors you do not have', () => {
    let s = play(withDesk(start(), 'goosePond'), { type: 'choose', cardId: 'goosePond', option: 0, skill: 2 });
    expect(s.projects.map((p) => p.id)).toEqual(['pond']);
    s = withDesk({ ...s, favors: 0 }, 'goosePond');
    expect(legalActions(s, content).filter((a) => a.type === 'choose')).toEqual([{ type: 'choose', cardId: 'goosePond', option: 2 }]);
  });
});

describe('month end', () => {
  it('pays tax income from the formula: mult x (10 + Business x 0.2)', () => {
    expect(play(withDesk(start()), { type: 'endDesk' }).reports[0]!.income).toBe(20);
    const high = play(withDesk(start()), { type: 'setTax', level: 'high' }, { type: 'endDesk' });
    expect(high.reports[0]!.income).toBe(26);
    expect(high.approval.people).toBe(47);
    const low = play(withDesk(start()), { type: 'setTax', level: 'low' }, { type: 'endDesk' });
    expect(low.reports[0]!.income).toBe(15);
    expect(low.approval.people).toBe(52);
  });
  it('cuts income 30% when Business is under 35', () => {
    const base = withDesk(start());
    expect(play({ ...base, approval: { ...base.approval, business: 30 } }, { type: 'endDesk' }).reports[0]!.income).toBe(Math.round(16 * 0.7));
  });
  it('charges project upkeep and applies monthly project effects', () => {
    const s = play(withDesk(start(), 'goosePond'), { type: 'choose', cardId: 'goosePond', option: 0, skill: 2 }, { type: 'endDesk' });
    expect(s.reports[0]!.projects).toBe(-2);
    expect(s.money).toBe(100 - 20 + 19 - 2);
    expect(s.approval.people).toBe(57);
  });
  it('grants a Favor when Press is 60 or more, capped at 5', () => {
    const base = withDesk(start());
    expect(play({ ...base, approval: { ...base.approval, press: 60 } }, { type: 'endDesk' }).favors).toBe(3);
    expect(play({ ...base, favors: 5, approval: { ...base.approval, press: 60 } }, { type: 'endDesk' }).favors).toBe(5);
  });
  it('a protest (People under 35) makes every card urgent next month', () => {
    const base = withDesk(start());
    const s = play({ ...base, approval: { ...base.approval, people: 30 } }, { type: 'endDesk' }, { type: 'next' });
    expect(s.desk.every((d) => d.urgent)).toBe(true);
  });
  it('fires a combo once, and completes objectives', () => {
    const base = withDesk(start());
    const s = play({ ...base, approval: { ...base.approval, press: 75 }, projects: [{ id: 'casino', builtMonth: 1 }, { id: 'helicopter', builtMonth: 1 }] }, { type: 'endDesk' });
    expect(s.reports[0]!.combos).toEqual(['vegasPd']);
    expect(s.objectivesDone).toContain('darling');
  });
  it('fades faster when popular and stops when unpopular', () => {
    TUNING.fade = 4; TUNING.fadeSlope = 0.2;
    expect([fadeFor(50), fadeFor(80), fadeFor(35), fadeFor(20)]).toEqual([4, 7, 1, 0]);
    expect(play(withDesk(start()), { type: 'endDesk' }).approval.law).toBe(46);
    TUNING.fade = 0; TUNING.fadeSlope = 0;
  });
});

describe('the day', () => {
  /** Finish the current day's two months with an empty desk. */
  const finishDay = (s: State) => play(withDesk(s), { type: 'endDesk' }, { type: 'next' }, { type: 'skipInitiative' });
  it('runs cards first, then the Mayor\'s Hour, then the poll', () => {
    let s = finishDay(start()); // month 2 desk
    expect(s.month).toBe(2);
    s = play(withDesk(s), { type: 'endDesk' }, { type: 'next' });
    expect(s.phase).toBe('decree');
    expect(s.decreeOffer).toHaveLength(4);
    expect(s.polls).toHaveLength(0);
    const [first, second] = s.decreeOffer as [string, string];
    const one = play(s, { type: 'decree', id: first });
    expect(one.phase).toBe('decree'); // a second decree is allowed
    expect(one.decreeOffer).not.toContain(first);
    expect(play(one, { type: 'skipDecree' }).phase).toBe('dayEnd');
    const two = play(one, { type: 'decree', id: second });
    expect(two.phase).toBe('dayEnd'); // two is the limit
    expect(two.decrees).toEqual([first, second]);
    expect(two.polls).toHaveLength(1);
    expect(play(s, { type: 'skipDecree' }).phase).toBe('dayEnd');
  });
  it("today's three are the same for every mayor whatever state their town is in", () => {
    const a = start('alice');
    const b = { ...start('bob'), approval: { people: 20, business: 90, law: 10, press: 60 }, flags: { gooseGrudge: true as const } };
    const day2 = (s: State) => coverMissedDays(s, content, 2).desk.map((d) => d.cardId);
    expect(a.desk.map((d) => d.cardId)).toEqual(start('bob').desk.map((d) => d.cardId));
    expect(day2(a)).toEqual(day2(b));
    expect(a.desk.every((d) => d.why === 'shared')).toBe(true);
  });
  it("your town's three come from your weakest groups and your own choices", () => {
    const second = (approval: State['approval'], flags: State['flags'] = {}) => play(withDesk({ ...start(), approval, flags }), { type: 'endDesk' }, { type: 'next' }, { type: 'skipInitiative' }).desk;
    const lawless = second({ people: 60, business: 60, law: 20, press: 60 });
    expect(lawless.map((d) => findCard(content, d.cardId).group)).toContain('law');
    expect(lawless.some((d) => d.why === 'low:law')).toBe(true);
    const hated = second({ people: 20, business: 60, law: 60, press: 60 });
    expect(hated.map((d) => d.cardId)).not.toEqual(lawless.map((d) => d.cardId));
    const geese = second({ people: 50, business: 50, law: 50, press: 50 }, { gooseGrudge: true });
    expect(geese.find((d) => d.cardId === 'gooseOccupation')).toMatchObject({ urgent: true, why: 'choice' });
  });
  it('offers everyone the same decrees', () => {
    const at = (seed: string) => play(withDesk(finishDay(start(seed))), { type: 'endDesk' }, { type: 'next' });
    expect(at('alice').decreeOffer).toEqual(at('bob').decreeOffer);
  });
  it('a decree pays or costs every month', () => {
    const base = withDesk(start());
    const s = play({ ...base, decrees: ['doorTax'] }, { type: 'endDesk' });
    expect(s.reports[0]!.decrees).toBe(6);
    expect(s.approval.people).toBe(49);
  });
  it("the day's own card (the old daily event) leads today's three, and every desk card has a game", () => {
    const s = start();
    expect(s.desk[0]!.cardId).toBe('evParade');
    expect(s.desk).toHaveLength(3);
    expect(s.phase).toBe('desk');
  });
  it('midday offers three activities; doing one well pays, a flop costs', () => {
    const noon = play(withDesk(start()), { type: 'endDesk' }, { type: 'next' });
    expect(noon.phase).toBe('initiative');
    expect(noon.initiativeOffer).toHaveLength(3);
    const id = noon.initiativeOffer[0]!;
    const it = content.pack.initiatives.find((x) => x.id === id)!;
    const clean = play(noon, { type: 'initiative', id, skill: 2 });
    const flop = play(noon, { type: 'initiative', id, skill: 0 });
    expect(clean.phase).toBe('desk');
    expect(clean.month).toBe(2);
    expect(clean.money).toBe(noon.money + (it.clean.money ?? 0));
    expect(flop.money).toBe(noon.money + (it.flop.money ?? 0));
    expect(play(noon, { type: 'skipInitiative' }).phase).toBe('desk');
  });
  it('a catastrophe strikes on Wednesday and Saturday, the same for everyone, and Dave cannot take it', () => {
    const wed = coverMissedDays(start('a'), content, 3);
    const cat = wed.desk.find((d) => d.major)!;
    expect(cat).toBeTruthy();
    expect(wed.desk).toHaveLength(4);
    expect(coverMissedDays(start('b'), content, 3).desk.find((d) => d.major)!.cardId).toBe(cat.cardId);
    expect(legalActions(wed, content).some((a) => a.type === 'delegate' && a.cardId === cat.cardId)).toBe(false);
    const card = findCard(content, cat.cardId);
    expect(card.stages).toHaveLength(3);
    const c = botchCost(card, 0);
    expect(Object.keys(c.effects)).toHaveLength(4);
    expect(c.money).toBeLessThan(-10);
    expect(coverMissedDays(start('a'), content, 2).desk.some((d) => d.major)).toBe(false);
  });
  it('an enacted decree can bring a follow-up card', () => {
    const s = play(withDesk({ ...start(), flags: { 'law:gooseWay': true } }), { type: 'endDesk' }, { type: 'next' }, { type: 'skipInitiative' });
    expect(s.desk.find((d) => d.cardId === 'lawGeese')).toMatchObject({ why: 'choice', urgent: true });
  });
});

describe('promises', () => {
  const promised = () => {
    let s = play(withDesk(start(), 'festival'), { type: 'choose', cardId: 'festival', option: 1, skill: 2 }, { type: 'endDesk' }, { type: 'next' }, { type: 'skipInitiative' });
    s = play(withDesk(s), { type: 'endDesk' }, { type: 'next' }, { type: 'skipDecree' }, { type: 'next' }); // day 2, month 3
    return s;
  };
  it('gives the benefit now and comes due later', () => {
    const s = promised();
    expect(s.month).toBe(3);
    expect(s.phase).toBe('promises');
    expect(s.duePromises).toHaveLength(1);
  });
  it('paying costs the money; breaking costs double the gain and 4 points at the election', () => {
    const s = promised();
    const id = s.duePromises[0]!;
    const paid = play(s, { type: 'resolvePromise', id, pay: true });
    expect(paid.money).toBe(s.money - 14);
    expect(paid.phase).toBe('desk');
    const broke = play(s, { type: 'resolvePromise', id, pay: false });
    expect(broke.approval.people).toBe(s.approval.people - 10);
    expect(voteShare(broke, 0)).toBe(voteShare({ ...broke, brokenPromises: 0 }, 0) - 4);
  });
});

describe('recall', () => {
  it('resets the town and costs 8 points at the election', () => {
    const base = withDesk(start(), 'curfew');
    const s = play({ ...base, approval: { ...base.approval, people: 8 } }, { type: 'choose', cardId: 'curfew', option: 0, skill: 2 });
    expect(s.recalls).toBe(1);
    expect(s.approval).toEqual({ people: 40, business: 40, law: 40, press: 40 });
    expect(s.money).toBe(20);
    expect(voteShare(s, 0)).toBe(50 - 5 - 2 - 1 - 1 - 8);
  });
  it('triggers on bankruptcy, and a third recall ends the term with a result', () => {
    const base = withDesk(start());
    expect(play({ ...base, money: -60, leases: [{ cardId: 'x', monthly: -30 }] }, { type: 'endDesk' }).flags.wentBankrupt).toBe(true);
    const third = withDesk(start(), 'curfew');
    const s = play({ ...third, recalls: 2, approval: { ...third.approval, people: 8 } }, { type: 'choose', cardId: 'curfew', option: 0, skill: 2 });
    expect(s.phase).toBe('results');
    expect(s.result?.endedEarly).toBe(true);
  });
});

describe('election', () => {
  it('follows the vote share formula and clamps to 5-95', () => {
    const s = start();
    expect(voteShare(s, 0)).toBe(50);
    expect(voteShare({ ...s, approval: { people: 70, business: 60, law: 40, press: 60 } }, 3)).toBe(50 + 10 + 2 + 1 - 1 + 3);
    expect(voteShare({ ...s, approval: { ...s.approval, press: 30 } }, 0)).toBe(50 - 4 - 5);
    expect(voteShare({ ...s, objectivesDone: ['a', 'b'] }, 0)).toBe(54);
    expect(voteShare({ ...s, approval: { people: 100, business: 100, law: 100, press: 100 } }, 20)).toBe(95);
    expect(voteShare({ ...s, approval: { people: 1, business: 1, law: 1, press: 1 }, recalls: 2 }, 0)).toBe(5);
  });
  it('a full term runs Monday to Sunday: 12 months, 6 polls, 36 cards or fewer per player, a campaign and a result', () => {
    const s = autoplay(start('full'), sensible, content, () => false);
    expect(s.phase).toBe('results');
    expect(s.reports).toHaveLength(12);
    expect(s.polls).toHaveLength(6);
    expect(s.history.some((h) => h.cardId.startsWith('campaign'))).toBe(true);
    for (let day = 1; day <= 6; day++) {
      const n = s.history.filter((h) => Math.ceil(h.month / 2) === day && h.choice !== 'ignored').length;
      expect(n).toBeLessThanOrEqual(14);
    }
  });
});

describe('missed days and joining mid-week', () => {
  it('Dave governs every missed day and hands the town back at the start of today', () => {
    const s = coverMissedDays(start('late'), content, 4);
    expect(s.day).toBe(4);
    expect(s.month).toBe(7);
    expect(s.phase === 'desk' || s.phase === 'promises').toBe(true);
    expect(s.daveDays).toEqual([1, 2, 3]);
  });
  it('the handover is a little worse than a fresh start but never ruined', () => {
    for (const seed of ['a', 'b', 'c', 'd', 'e', 'f']) {
      const s = coverMissedDays(start(seed), content, 6);
      for (const g of ['people', 'business', 'law', 'press'] as const) expect(s.approval[g]).toBeGreaterThanOrEqual(35);
      expect(s.money).toBeGreaterThanOrEqual(40);
      expect(s.recalls).toBe(0);
      expect(s.brokenPromises).toBe(0);
    }
  });
  it('does not replay a finished day, and lands on the campaign card on Sunday', () => {
    const played = autoplay(start('p'), sensible, content, (st) => st.phase === 'dayEnd');
    expect(coverMissedDays(played, content, 2).daveDays).toEqual([]);
    const sun = coverMissedDays(start('sun'), content, 7);
    expect(sun.phase).toBe('campaign');
    expect(sun.daveDays).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('town setup', () => {
  const profile = { mayor: '  Mayor <b>Pat</b>  ', town: 'Goosebury', base: 'press' as const, perk: 'chest' as const };
  it('can be done at any point, once: base up, rival down, perk applied', () => {
    const late = autoplay(start('s'), sensible, content, (st) => st.phase === 'dayEnd');
    const s = reduce(late, { type: 'setup', profile }, content);
    expect(s.approval.press).toBe(Math.min(100, late.approval.press + 8));
    expect(s.approval.law).toBe(late.approval.law - 4);
    expect(s.money).toBe(late.money + 30);
    expect(s.profile!.mayor).toBe('Mayor bPat/b');
    expect(() => reduce(s, { type: 'setup', profile }, content)).toThrow(/once/);
  });
  it('the cousin perk makes the first Dave each month free; names can be changed later', () => {
    let s = reduce(withDesk(start(), 'snowplow', 'curfew'), { type: 'setup', profile: { ...profile, perk: 'cousin' } }, content);
    s = play(s, { type: 'delegate', cardId: 'curfew' });
    expect(s.favors).toBe(2);
    s = play(s, { type: 'delegate', cardId: 'snowplow' });
    expect(s.favors).toBe(1);
    expect(reduce(s, { type: 'rename', mayor: 'Sam', town: 'Upper Honk' }, content).profile).toMatchObject({ mayor: 'Sam', town: 'Upper Honk', base: 'press' });
  });
});

describe('gambles', () => {
  it('apply the win or the lose outcome, and the same player always gets the same result', () => {
    const run = (seed: string) => play(withDesk(start(seed), 'cheeseVault'), { type: 'choose', cardId: 'cheeseVault', option: 0, skill: 2 });
    const results = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((seed) => run(seed));
    for (const s of results) expect(s.money).toBe(s.history[0]!.won ? 132 : 90);
    expect(new Set(results.map((s) => s.history[0]!.won)).size).toBe(2);
    expect(run('a')).toEqual(run('a'));
  });
});

describe('content validation', () => {
  it('rejects a bad project reference, an over-long label, and a desk card without a game', () => {
    const bad = structuredClone(week1) as { cards: { game?: unknown; options: { project?: string; label: string }[] }[] };
    bad.cards[0]!.options[0]!.project = 'volcano';
    expect(() => loadPack(bad)).toThrow(/unknown project volcano/);
    const long = structuredClone(week1) as typeof bad;
    long.cards[0]!.options[0]!.label = 'x'.repeat(29);
    expect(() => loadPack(long)).toThrow();
    const nogame = structuredClone(week1) as typeof bad;
    delete nogame.cards[0]!.game;
    expect(() => loadPack(nogame)).toThrow(/needs a mini-game/);
  });
});
