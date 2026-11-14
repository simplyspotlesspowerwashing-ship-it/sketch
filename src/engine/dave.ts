// Deputy Dave governs the days the player missed (including the days before a mid-week start).
import { autoplay, reduce } from './engine.ts';
import type { Policy } from './engine.ts';
import { seededRng } from './rng.ts';
import { TUNING } from './tuning.ts';
import { GROUPS } from './types.ts';
import type { Content, Rng, State } from './types.ts';

/** Dave's way of running a month: delegate one card to himself, wing one, forget the third. */
export const davePolicy: Policy = (s, legal, _content, rand) => {
  const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)]!;
  switch (s.phase) {
    case 'promises':
      return legal.find((a) => a.type === 'resolvePromise' && a.pay) ?? legal[0]!;
    case 'desk': {
      const delegate = legal.filter((a) => a.type === 'delegate');
      if (delegate.length > 0) return delegate[0]!;
      const chooses = legal.filter((a) => a.type === 'choose');
      const winged = s.desk.some((d) => d.status === 'done');
      if (!winged && chooses.length > 0) return pick(chooses);
      return { type: 'endDesk' };
    }
    case 'event': {
      const chooses = legal.filter((a) => a.type === 'choose');
      return chooses.length > 0 && rand() < 0.5 ? pick(chooses) : { type: 'skipEvent' };
    }
    case 'campaign':
      return legal[legal.length - 1]!;
    default:
      return { type: 'next' };
  }
};

/**
 * Advance the term to `today` (1 = Monday ... 7 = Sunday), with Dave governing every day the
 * player did not finish. Afterwards the town is handed back a little worse for wear but never
 * ruined: approval and money are lifted to a floor, spare money is capped, and recalls or broken promises that
 * happened on Dave's watch are not held against the player.
 */
export function coverMissedDays(state: State, content: Content, today: number, rng: Rng = seededRng): State {
  let s = state;
  while (s.phase !== 'results' && s.day < today) {
    if (s.phase !== 'dayEnd') {
      const before = { recalls: s.recalls, broken: s.brokenPromises };
      s = autoplay(s, davePolicy, content, (st) => st.phase === 'dayEnd', rng);
      if (s.phase === 'results') break;
      s = structuredClone(s);
      const H = TUNING.handover;
      for (const g of GROUPS) s.approval[g] = Math.max(s.approval[g], H.approvalFloor);
      s.money = Math.min(Math.max(s.money, H.moneyFloor), H.moneyCap); // Dave spends whatever is left over on 'lunch'
      s.protestNext = false;
      s.recalls = before.recalls;
      s.brokenPromises = before.broken;
      s.lastRecall = null;
      delete s.flags.wentBankrupt;
      delete s.flags.wasRecalled;
      s.daveDays.push(s.day);
    }
    s = reduce(s, { type: 'next' }, content, rng);
  }
  return s;
}
