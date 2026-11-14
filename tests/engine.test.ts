import { describe, expect, it } from 'vitest';
import { daveOnly, sensible } from '../sim/bots.ts';
import { placeholderContent as content } from '../src/content/index.ts';
import { loadPack } from '../src/content/schema.ts';
import placeholder from '../src/content/packs/placeholder.json' with { type: 'json' };
import { voteShare } from '../src/engine/election.ts';
import { autoplay, legalActions, newTerm, reduce } from '../src/engine/engine.ts';
import type { Action, State } from '../src/engine/types.ts';

const start = (seed = 'p1') => newTerm('placeholder', seed, content);
const play = (s: State, ...actions: Action[]) => actions.reduce((st, a) => reduce(st, a, content), s);
/** A state with a chosen desk, so tests do not depend on the shared draw order. */
const withDesk = (s: State, ...ids: string[]): State => ({ ...s, desk: ids.map((cardId) => ({ cardId, status: 'open' as const })) });

describe('setup and determinism', () => {
  it('starts with the brief\'s numbers', () => {
    const s = start();
    expect(s.money).toBe(100);
    expect(s.favors).toBe(2);
    expect(s.approval).toEqual({ people: 50, business: 50, law: 50, press: 50 });
    expect(s.actionsLeft).toBe(2);
    expect(s.desk).toHaveLength(3);
  });
  it('gives every player the same desk', () => {
    expect(start('alice').desk).toEqual(start('bob').desk);
  });
  it('is reproducible for the same player and differs between players only through Dave', () => {
    const a = autoplay(start('same'), daveOnly, content, () => false);
    const b = autoplay(start('same'), daveOnly, content, () => false);
    expect(a).toEqual(b);
    const c = autoplay(start('other'), daveOnly, content, () => false);
    expect(c.history.map((h) => h.cardId)).toEqual(a.history.map((h) => h.cardId).slice(0, c.history.length));
  });
  it('does not mutate the input state', () => {
    const s = start();
    const copy = structuredClone(s);
    reduce(s, { type: 'endDesk' }, content);
    expect(s).toEqual(copy);
  });
  it('rejects illegal actions', () => {
    expect(() => reduce(start(), { type: 'next' }, content)).toThrow(/illegal/);
  });
});

describe('desk', () => {
  it('spends actions, and stops at two', () => {
    let s = withDesk(start(), 'snowplow', 'curfew', 'festival');
    s = play(s, { type: 'choose', cardId: 'snowplow', option: 2 }, { type: 'choose', cardId: 'curfew', option: 0 });
    expect(s.actionsLeft).toBe(0);
    expect(s.money).toBe(85);
    expect(s.approval.law).toBe(60);
    expect(legalActions(s, content).some((a) => a.type === 'choose')).toBe(false);
  });
  it('lets one Favor buy one extra action per day', () => {
    let s = play(start(), { type: 'buyAction' });
    expect(s.actionsLeft).toBe(3);
    expect(s.favors).toBe(1);
    expect(legalActions(s, content).some((a) => a.type === 'buyAction')).toBe(false);
  });
  it('allows one free delegation per month', () => {
    let s = withDesk(start(), 'snowplow', 'curfew', 'festival');
    s = play(s, { type: 'delegate', cardId: 'curfew' });
    expect(s.actionsLeft).toBe(2);
    expect(s.desk[1]!.status).toBe('dave');
    expect(legalActions(s, content).some((a) => a.type === 'delegate')).toBe(false);
  });
  it('applies ignored effects and escalation flags to unhandled cards', () => {
    let s = withDesk(start(), 'goosePond', 'curfew', 'parkingMeters');
    s = play(s, { type: 'endDesk' });
    expect(s.flags.gooseGrudge).toBe(true);
    expect(s.approval.people).toBe(45);
    expect(s.approval.law).toBe(45);
  });
  it('injects the escalation card once its flag is set', () => {
    let s = withDesk(start(), 'goosePond', 'curfew', 'parkingMeters');
    s = play(s, { type: 'choose', cardId: 'goosePond', option: 2 }, { type: 'endDesk' }, { type: 'next' });
    expect(s.month).toBe(2);
    expect(s.desk.map((d) => d.cardId)).toContain('gooseOccupation');
  });
  it('blocks building the same project twice and spending Favors you do not have', () => {
    let s = withDesk(start(), 'goosePond', 'curfew', 'festival');
    s = play(s, { type: 'choose', cardId: 'goosePond', option: 0 });
    expect(s.projects.map((p) => p.id)).toEqual(['pond']);
    s = withDesk({ ...s, favors: 0 }, 'goosePond', 'curfew', 'festival');
    const options = legalActions(s, content).filter((a) => a.type === 'choose' && a.cardId === 'goosePond');
    expect(options).toEqual([{ type: 'choose', cardId: 'goosePond', option: 2 }]);
  });
});

describe('month end', () => {
  it('pays tax income from the formula: mult x (10 + Business x 0.2)', () => {
    const s = play(withDesk(start(), 'parkingMeters'), { type: 'endDesk' });
    expect(s.reports[0]!.income).toBe(20);
    expect(s.money).toBe(120);
    const high = play(withDesk(start(), 'parkingMeters'), { type: 'setTax', level: 'high' }, { type: 'endDesk' });
    expect(high.reports[0]!.income).toBe(26);
    expect(high.approval.people).toBe(47);
    const low = play(withDesk(start(), 'parkingMeters'), { type: 'setTax', level: 'low' }, { type: 'endDesk' });
    expect(low.reports[0]!.income).toBe(15);
    expect(low.approval.people).toBe(52);
  });
  it('cuts income 30% when Business is under 35', () => {
    const base = withDesk(start(), 'parkingMeters');
    const s = play({ ...base, approval: { ...base.approval, business: 30 } }, { type: 'endDesk' });
    expect(s.reports[0]!.income).toBe(Math.round(16 * 0.7));
  });
  it('charges project upkeep and applies monthly project effects', () => {
    let s = withDesk(start(), 'goosePond', 'parkingMeters');
    s = play(s, { type: 'choose', cardId: 'goosePond', option: 0 }, { type: 'endDesk' });
    expect(s.reports[0]!.projects).toBe(-2);
    expect(s.money).toBe(100 - 20 + 19 - 2); // business fell to 45 -> income 19
    expect(s.approval.people).toBe(57); // +5 card, +2 pond
  });
  it('grants a Favor when Press is 60 or more, capped at 5', () => {
    const base = withDesk(start(), 'parkingMeters');
    expect(play({ ...base, approval: { ...base.approval, press: 60 } }, { type: 'endDesk' }).favors).toBe(3);
    expect(play({ ...base, favors: 5, approval: { ...base.approval, press: 60 } }, { type: 'endDesk' }).favors).toBe(5);
  });
  it('a protest removes one action next month when People is under 35', () => {
    const base = withDesk(start(), 'parkingMeters');
    const s = play({ ...base, approval: { ...base.approval, people: 30 } }, { type: 'endDesk' }, { type: 'next' });
    expect(s.actionsLeft).toBe(1);
  });
  it('fires a combo once when both projects exist', () => {
    const base = withDesk(start(), 'parkingMeters');
    const s = play({ ...base, projects: [{ id: 'casino', builtMonth: 1 }, { id: 'helicopter', builtMonth: 1 }] }, { type: 'endDesk' });
    expect(s.reports[0]!.combos).toEqual(['vegasPd']);
    expect(s.combosDone).toEqual(['vegasPd']);
  });
  it('completes objectives', () => {
    const s = play(withDesk(start(), 'goosePond', 'parkingMeters'), { type: 'choose', cardId: 'goosePond', option: 0 }, { type: 'endDesk' });
    expect(s.objectivesDone).toContain('peaceful');
    expect(s.flags['obj:peaceful']).toBe(true);
  });
});

describe('promises', () => {
  const promised = () => {
    let s = withDesk(start(), 'festival', 'parkingMeters');
    s = play(s, { type: 'choose', cardId: 'festival', option: 1 }, { type: 'endDesk' }, { type: 'next' }); // month 2
    s = play(withDesk(s, 'parkingMeters'), { type: 'endDesk' }, { type: 'next' }, { type: 'next' }); // month 3, day 2
    return s;
  };
  it('gives the benefit now and comes due later', () => {
    const s = promised();
    expect(s.month).toBe(3);
    expect(s.phase).toBe('promises');
    expect(s.duePromises).toHaveLength(1);
  });
  it('paying costs the money', () => {
    const s = promised();
    const paid = play(s, { type: 'resolvePromise', id: s.duePromises[0]!, pay: true });
    expect(paid.money).toBe(s.money - 12);
    expect(paid.brokenPromises).toBe(0);
    expect(paid.phase).toBe('desk');
  });
  it('breaking costs double the original gain and counts against the election', () => {
    const s = promised();
    const broke = play(s, { type: 'resolvePromise', id: s.duePromises[0]!, pay: false });
    expect(broke.approval.people).toBe(s.approval.people - 10);
    expect(broke.brokenPromises).toBe(1);
    expect(voteShare(broke, 0)).toBe(voteShare({ ...broke, brokenPromises: 0 }, 0) - 4);
  });
});

describe('recall', () => {
  it('resets the town and costs 8 points at the election', () => {
    const base = withDesk(start(), 'curfew');
    const s = play({ ...base, approval: { ...base.approval, people: 8 } }, { type: 'choose', cardId: 'curfew', option: 0 });
    expect(s.recalls).toBe(1);
    expect(s.approval).toEqual({ people: 40, business: 40, law: 40, press: 40 });
    expect(s.money).toBe(20);
    expect(s.lastRecall).toBeTruthy();
    expect(voteShare(s, 0)).toBe(50 - 5 - 2 - 1 - 1 - 8);
  });
  it('triggers on bankruptcy at month end', () => {
    const base = withDesk(start(), 'parkingMeters');
    const s = play({ ...base, money: -60, leases: [{ cardId: 'x', monthly: -30 }] }, { type: 'endDesk' });
    expect(s.recalls).toBe(1);
    expect(s.flags.wentBankrupt).toBe(true);
  });
  it('a third recall ends the term early but still produces a result', () => {
    const base = withDesk(start(), 'curfew');
    const s = play({ ...base, recalls: 2, approval: { ...base.approval, people: 8 } }, { type: 'choose', cardId: 'curfew', option: 0 });
    expect(s.phase).toBe('results');
    expect(s.result?.endedEarly).toBe(true);
    expect(s.result?.won).toBe(false);
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
  it('a full term runs Monday to Sunday: 12 months, 6 polls, a campaign and a result', () => {
    const s = autoplay(start('full'), sensible, content, () => false);
    expect(s.phase).toBe('results');
    expect(s.reports).toHaveLength(12);
    expect(s.polls).toHaveLength(6);
    expect(s.day).toBe(7);
    expect(s.result!.share).toBeGreaterThanOrEqual(5);
    expect(s.result!.won).toBe(s.result!.share >= 50);
    expect(s.history.some((h) => h.cardId === 'campaign')).toBe(true);
  });
  it('keeps each day within 14 decisions', () => {
    const s = autoplay(start('count'), sensible, content, () => false);
    for (let day = 1; day <= 6; day++) {
      const n = s.history.filter((h) => Math.ceil(h.month / 2) === day && h.choice !== 'ignored').length;
      expect(n).toBeLessThanOrEqual(14);
    }
  });
});

describe('missed days', () => {
  it('Dave can govern a whole day and hand the town back', () => {
    const s = autoplay(start('away'), daveOnly, content, (st) => st.phase === 'dayEnd');
    expect(s.phase).toBe('dayEnd');
    expect(s.day).toBe(1);
    expect(s.reports).toHaveLength(2);
    expect(s.history.filter((h) => h.choice === 'dave')).toHaveLength(2);
  });
});

describe('content validation', () => {
  it('rejects a pack with a bad project reference', () => {
    const bad = structuredClone(placeholder) as { cards: { options: { project?: string }[] }[] };
    bad.cards[0]!.options[0]!.project = 'volcano';
    expect(() => loadPack(bad)).toThrow(/unknown project volcano/);
  });
  it('rejects labels over 28 characters', () => {
    const bad = structuredClone(placeholder) as { cards: { options: { label: string }[] }[] };
    bad.cards[0]!.options[0]!.label = 'x'.repeat(29);
    expect(() => loadPack(bad)).toThrow();
  });
});
