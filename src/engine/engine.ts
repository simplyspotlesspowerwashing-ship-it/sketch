// Pure, deterministic rules engine. No DOM, no clock, no storage.
//   reduce(state, action, content, rng) -> new state
// Shared draws (desk order, rare cards, headlines) are keyed by week only, so every
// player sees the same thing. Deputy Dave's outcomes are keyed by player and month.
import { voteParts, voteShare } from './election.ts';
import { seededRng, shuffled } from './rng.ts';
import { TUNING } from './tuning.ts';
import { GROUPS } from './types.ts';
import type { Action, Card, Condition, Content, DeskSlot, Effects, MonthReport, Option, Rng, State } from './types.ts';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const dayOfMonth = (month: number) => Math.ceil(month / 2);
export const monthOfDay = (month: number): 1 | 2 => (month % 2 === 1 ? 1 : 2);

/** Monthly approval fade for a group at this approval: popular mayors fade faster, unpopular ones stop falling. */
export function fadeFor(approval: number): number {
  return Math.round(clamp(TUNING.fade + (approval - 50) * TUNING.fadeSlope, 0, TUNING.fadeMax));
}

// ---------- lookups ----------

export function findCard(content: Content, id: string): Card {
  const p = content.pack;
  const c = p.cards.find((x) => x.id === id) ?? p.events.find((x) => x.id === id) ?? p.campaign.find((x) => x.id === id);
  if (!c) throw new Error(`unknown card ${id}`);
  return c;
}

export function holds(s: State, cond: Condition | undefined): boolean {
  if (!cond) return true;
  if (cond.flags?.some((f) => !s.flags[f])) return false;
  if (cond.notFlags?.some((f) => s.flags[f])) return false;
  const owned = new Set(s.projects.map((p) => p.id));
  if (cond.projects?.some((p) => !owned.has(p))) return false;
  if (cond.notProjects?.some((p) => owned.has(p))) return false;
  if (cond.fromMonth !== undefined && s.month < cond.fromMonth) return false;
  for (const g of GROUPS) {
    if (cond.min?.[g] !== undefined && s.approval[g] < cond.min[g]) return false;
    if (cond.max?.[g] !== undefined && s.approval[g] > cond.max[g]) return false;
  }
  return true;
}

/** Money an option moves right now (project build cost included). */
export function upfront(o: Option, content: Content): number {
  return (o.money ?? 0) - (o.project ? content.projects[o.project]!.build : 0);
}

/** Why an option cannot be picked, or null if it can. */
export function blocked(s: State, o: Option, content: Content): string | null {
  if (o.project && s.projects.some((p) => p.id === o.project)) return 'Already built';
  if (s.favors + (o.favors ?? 0) < 0) return 'Not enough Favors';
  const cost = upfront(o, content);
  if (cost < 0 && s.money + cost < TUNING.bankruptAt) return 'Would bankrupt the town';
  return null;
}

export function campaignCard(s: State, content: Content): Card {
  const list = content.pack.campaign;
  return list.find((c) => holds(s, c.requires)) ?? list[list.length - 1]!;
}

// ---------- state changes (mutate a private clone) ----------

function applyEffects(s: State, e: Effects | undefined, scale = 1) {
  if (!e) return;
  for (const g of GROUPS) if (e[g]) s.approval[g] = clamp(s.approval[g] + e[g] * scale, 0, 100);
}

function addFavors(s: State, n: number) {
  s.favors = clamp(s.favors + n, 0, TUNING.favorCap);
}

/** Recall: any group at 0 or money below the bankruptcy line. Returns true if the term ended. */
function checkRecall(s: State, content: Content, rng: Rng): boolean {
  const zero = GROUPS.some((g) => s.approval[g] <= 0);
  if (!zero && s.money >= TUNING.bankruptAt) return false;
  s.recalls += 1;
  const endings = content.pack.recallEndings;
  const pick = Math.floor(rng(`${s.weekId}|recall|${s.recalls}`)() * endings.length);
  s.lastRecall = endings[pick] ?? 'You have been recalled.';
  s.monthTags.push('recall');
  s.flags[s.money < TUNING.bankruptAt ? 'wentBankrupt' : 'wasRecalled'] = true;
  for (const g of GROUPS) s.approval[g] = TUNING.recall.approval;
  s.money = TUNING.recall.money;
  if (s.recalls > TUNING.recall.max) {
    finish(s, true);
    return true;
  }
  return false;
}

function applyOption(s: State, card: Card, index: number, content: Content) {
  const o = card.options[index]!;
  s.money += upfront(o, content);
  addFavors(s, o.favors ?? 0);
  applyEffects(s, o.effects);
  if (o.project) {
    s.projects.push({ id: o.project, builtMonth: s.month });
    applyEffects(s, content.projects[o.project]!.onBuild);
    s.flags[`built${s.projects.length}`] = true; // objectives can require e.g. flag "built2"
  }
  if (o.monthly) s.leases.push({ cardId: card.id, monthly: o.monthly });
  if (o.promise) {
    s.promises.push({
      id: `${card.id}@${s.month}`,
      cardId: card.id,
      label: o.label,
      dueMonth: s.month + o.promise.dueIn,
      money: o.promise.money,
      gain: o.effects,
    });
  }
  if (o.setFlag) s.flags[o.setFlag] = true;
  if (o.headlineTag) s.monthTags.push(o.headlineTag);
  if (o.campaign) s.campaignEffect += o.campaign;
}

function breakPromise(s: State, id: string) {
  const p = s.promises.find((x) => x.id === id)!;
  for (const g of GROUPS) {
    const gain = p.gain[g] ?? 0;
    if (gain > 0) s.approval[g] = clamp(s.approval[g] - 2 * gain, 0, 100);
  }
  s.brokenPromises += 1;
  s.monthTags.push('brokenPromise');
  s.promises = s.promises.filter((x) => x.id !== id);
}

function drawDesk(s: State, content: Content, rng: Rng): DeskSlot[] {
  const { cards } = content.pack;
  const d = dayOfMonth(s.month);
  const m = monthOfDay(s.month);
  const ids = cards.filter((c) => c.day === d && (c.month ?? 1) === m).map((c) => c.id);
  // Fill from the shared pool (same order for everyone) when the pack has fewer than 3 fixed cards.
  const pool = shuffled(
    cards.filter((c) => !c.day && !c.requires && !c.rare && !c.secret).map((c) => c.id),
    rng(`${s.weekId}|pool`),
  );
  let guard = 0;
  while (ids.length < 3 && pool.length > 0 && guard++ < pool.length * 2) {
    const id = pool[s.poolCursor % pool.length]!;
    s.poolCursor += 1;
    if (!ids.includes(id)) ids.push(id);
  }
  // One conditional card per month takes the last slot: escalations, group-pressure, secret cards.
  const inject = cards.find(
    (c) => !c.day && !c.rare && (c.requires || c.secret) && holds(s, c.requires) && (c.repeatable || !s.usedCards.includes(c.id)) && !ids.includes(c.id),
  );
  if (inject) ids[Math.min(2, ids.length)] = inject.id;
  const urgentId = inject?.id;
  // Rare card: shared 1-in-50 draw per month, takes the middle slot.
  const rares = cards.filter((c) => c.rare && holds(s, c.requires) && !s.usedCards.includes(c.id));
  const r = rng(`${s.weekId}|rare|${s.month}`);
  if (rares.length > 0 && r() < TUNING.rareChance) ids[Math.min(1, ids.length)] = rares[Math.floor(r() * rares.length)]!.id;
  for (const id of ids) if (!s.usedCards.includes(id)) s.usedCards.push(id);
  return ids.slice(0, 3).map((cardId) => ({ cardId, status: 'open' as const, ...(cardId === urgentId && ids.includes(cardId) ? { urgent: true } : {}) }));
}

function startMonth(s: State, content: Content, rng: Rng) {
  s.actionsLeft = Math.max(0, TUNING.actionsPerMonth - (s.protestNext ? 1 : 0));
  s.protestNext = false;
  s.delegatedThisMonth = false;
  s.monthTags = [];
  s.lastRecall = null;
  if (monthOfDay(s.month) === 1) s.boughtActionToday = false;
  s.desk = drawDesk(s, content, rng);
  s.duePromises = s.promises.filter((p) => p.dueMonth <= s.month).map((p) => p.id);
  s.phase = s.duePromises.length > 0 ? 'promises' : 'desk';
}

function eventForToday(s: State, content: Content): Card | undefined {
  if (monthOfDay(s.month) !== 1) return undefined;
  return content.pack.events.find((e) => e.day === dayOfMonth(s.month) && holds(s, e.requires));
}

function headline(s: State, content: Content, rng: Rng): string {
  const all = content.pack.headlines;
  const tagged = all.filter((h) => s.monthTags.includes(h.tag));
  const list = tagged.length > 0 ? tagged : all.filter((h) => h.tag === 'quiet');
  if (list.length === 0) return 'Nothing Happens; Town Suspicious';
  return list[Math.floor(rng(`${s.weekId}|headline|${s.month}|${s.monthTags.join(',')}`)() * list.length)]!.text;
}

function closeMonth(s: State, content: Content, rng: Rng) {
  const T = TUNING;
  const report: MonthReport = { month: s.month, income: 0, projects: 0, drift: {}, ignored: [], favorsGained: 0, combos: [], objectives: [], headline: '' };
  report.ignored = s.desk.filter((d) => d.status === 'ignored').map((d) => d.cardId);

  // Money
  const penalty = s.approval.business < T.low ? T.businessLowIncome : 1;
  report.income = Math.round(T.tax[s.tax].mult * (T.incomeBase + s.approval.business * T.incomePerBusiness) * penalty);
  for (const p of s.projects) report.projects += content.projects[p.id]!.monthly;
  for (const l of s.leases) report.projects += l.monthly;
  s.money += report.income + report.projects;

  // Drift
  const drift: Effects = {};
  const add = (e: Effects | undefined) => {
    if (e) for (const g of GROUPS) if (e[g]) drift[g] = (drift[g] ?? 0) + e[g];
  };
  add({ people: T.tax[s.tax].people });
  for (const g of GROUPS) add({ [g]: -fadeFor(s.approval[g]) });
  for (const p of s.projects) add(content.projects[p.id]!.perMonth);
  applyEffects(s, drift);
  report.drift = drift;

  // Favors
  const before = s.favors;
  if (s.approval.press >= T.pressFavorAt) addFavors(s, 1);
  for (const p of s.projects) {
    const every = content.projects[p.id]!.favorEvery;
    if (every && (s.month - p.builtMonth) > 0 && (s.month - p.builtMonth) % every === 0) addFavors(s, 1);
  }
  report.favorsGained = s.favors - before;

  // Combos: two projects together pay out once.
  const owned = new Set(s.projects.map((p) => p.id));
  for (const c of content.combos) {
    if (s.combosDone.includes(c.id) || !c.projects.every((p) => owned.has(p))) continue;
    s.combosDone.push(c.id);
    s.money += c.money ?? 0;
    addFavors(s, c.favors ?? 0);
    applyEffects(s, c.effects);
    s.flags[`combo:${c.id}`] = true;
    s.monthTags.push('combo');
    report.combos.push(c.id);
  }

  // Objectives
  for (const o of content.pack.objectives) {
    if (s.objectivesDone.includes(o.id) || !holds(s, o.when)) continue;
    s.objectivesDone.push(o.id);
    s.flags[`obj:${o.id}`] = true;
    report.objectives.push(o.id);
  }

  report.headline = headline(s, content, rng);
  s.protestNext = s.approval.people < T.low;
  const ended = checkRecall(s, content, rng);
  if (s.lastRecall) report.recall = s.lastRecall;
  s.reports.push(report);
  if (!ended) s.phase = 'report';
}

function settlePromisesAtTermEnd(s: State) {
  // Promises still open at the election come due: paid if the town can afford it, broken if not.
  for (const p of [...s.promises]) {
    if (s.money - p.money >= 0) {
      s.money -= p.money;
      s.promises = s.promises.filter((x) => x.id !== p.id);
    } else breakPromise(s, p.id);
  }
}

function finish(s: State, endedEarly: boolean) {
  settlePromisesAtTermEnd(s);
  const share = voteShare(s);
  s.result = { share, won: share >= 50, parts: voteParts(s), endedEarly };
  s.phase = 'results';
}

// ---------- public API ----------

export function newTerm(weekId: string, playerSeed: string, content: Content, rng: Rng = seededRng): State {
  const a = TUNING.startApproval;
  const s: State = {
    v: 1, weekId, playerSeed, day: 1, month: 1, phase: 'desk',
    money: TUNING.startMoney, favors: TUNING.startFavors,
    approval: { people: a, business: a, law: a, press: a },
    tax: 'medium', actionsLeft: 0, boughtActionToday: false, delegatedThisMonth: false, protestNext: false,
    desk: [], eventId: null, projects: [], leases: [], promises: [], duePromises: [], brokenPromises: 0,
    recalls: 0, lastRecall: null, flags: {}, objectivesDone: [], combosDone: [], usedCards: [], poolCursor: 0,
    monthTags: [], history: [], reports: [], polls: [], campaignEffect: 0, daveDays: [], result: null,
  };
  startMonth(s, content, rng);
  return s;
}

/** Every action that `reduce` would accept right now. Bots and the UI both use this. */
export function legalActions(s: State, content: Content): Action[] {
  const out: Action[] = [];
  const tax = () => {
    for (const level of ['low', 'medium', 'high'] as const) if (level !== s.tax) out.push({ type: 'setTax', level });
  };
  switch (s.phase) {
    case 'promises':
      for (const id of s.duePromises) {
        const p = s.promises.find((x) => x.id === id)!;
        if (s.money - p.money >= TUNING.bankruptAt) out.push({ type: 'resolvePromise', id, pay: true });
        out.push({ type: 'resolvePromise', id, pay: false });
      }
      break;
    case 'desk':
      for (const slot of s.desk) {
        if (slot.status !== 'open') continue;
        const card = findCard(content, slot.cardId);
        if (s.actionsLeft > 0) card.options.forEach((o, option) => { if (!blocked(s, o, content)) out.push({ type: 'choose', cardId: card.id, option }); });
        if (!s.delegatedThisMonth) out.push({ type: 'delegate', cardId: card.id });
      }
      if (!s.boughtActionToday && s.favors >= 1) out.push({ type: 'buyAction' });
      tax();
      out.push({ type: 'endDesk' });
      break;
    case 'event': {
      const card = findCard(content, s.eventId!);
      card.options.forEach((o, option) => { if (!blocked(s, o, content)) out.push({ type: 'choose', cardId: card.id, option }); });
      out.push({ type: 'skipEvent' });
      break;
    }
    case 'report':
    case 'dayEnd':
      tax();
      out.push({ type: 'next' });
      break;
    case 'campaign': {
      const card = campaignCard(s, content);
      card.options.forEach((o, option) => { if (!blocked(s, o, content)) out.push({ type: 'choose', cardId: card.id, option }); });
      break;
    }
    case 'results':
      break;
  }
  return out;
}

export function reduce(state: State, action: Action, content: Content, rng: Rng = seededRng): State {
  const legal = legalActions(state, content).some((a) => JSON.stringify(a) === JSON.stringify(action));
  if (!legal) throw new Error(`illegal action in phase ${state.phase}: ${JSON.stringify(action)}`);
  const s: State = structuredClone(state);

  switch (action.type) {
    case 'setTax':
      s.tax = action.level;
      return s;

    case 'buyAction':
      s.favors -= 1;
      s.actionsLeft += 1;
      s.boughtActionToday = true;
      return s;

    case 'resolvePromise': {
      if (action.pay) {
        const p = s.promises.find((x) => x.id === action.id)!;
        s.money -= p.money;
        s.promises = s.promises.filter((x) => x.id !== action.id);
        s.monthTags.push('keptPromise');
      } else breakPromise(s, action.id);
      s.duePromises = s.duePromises.filter((id) => id !== action.id);
      if (checkRecall(s, content, rng)) return s;
      if (s.duePromises.length === 0) s.phase = 'desk';
      return s;
    }

    case 'delegate': {
      const slot = s.desk.find((d) => d.cardId === action.cardId)!;
      const table = content.pack.dave.outcomes;
      const total = table.reduce((n, o) => n + o.weight, 0);
      let roll = rng(`${s.playerSeed}|${s.weekId}|dave|${s.month}|${action.cardId}`)() * total;
      const outcome = table.find((o) => (roll -= o.weight) < 0) ?? table[table.length - 1]!;
      s.money += outcome.money ?? 0;
      addFavors(s, outcome.favors ?? 0);
      applyEffects(s, outcome.effects);
      slot.status = 'dave';
      s.delegatedThisMonth = true;
      s.monthTags.push('dave');
      s.history.push({ month: s.month, cardId: action.cardId, choice: 'dave', dave: outcome.id });
      checkRecall(s, content, rng);
      return s;
    }

    case 'choose': {
      const card = findCard(content, action.cardId);
      applyOption(s, card, action.option, content);
      s.history.push({ month: s.month, cardId: card.id, choice: action.option });
      if (s.phase === 'desk') {
        const slot = s.desk.find((d) => d.cardId === card.id)!;
        slot.status = 'done';
        slot.option = action.option;
        s.actionsLeft -= 1;
        checkRecall(s, content, rng);
      } else if (s.phase === 'event') {
        if (!checkRecall(s, content, rng)) closeMonth(s, content, rng);
      } else if (s.phase === 'campaign') {
        finish(s, false);
      }
      return s;
    }

    case 'endDesk': {
      for (const slot of s.desk) {
        if (slot.status !== 'open') continue;
        slot.status = 'ignored';
        const card = findCard(content, slot.cardId);
        if (card.ignored) {
          applyEffects(s, card.ignored, slot.urgent ? TUNING.urgentIgnoreScale : 1);
          if (card.ignored.setFlag) s.flags[card.ignored.setFlag] = true;
        }
        if (slot.urgent) s.monthTags.push('urgentIgnored');
        s.history.push({ month: s.month, cardId: card.id, choice: 'ignored' });
      }
      if (checkRecall(s, content, rng)) return s;
      const event = eventForToday(s, content);
      if (event) {
        s.eventId = event.id;
        s.phase = 'event';
      } else closeMonth(s, content, rng);
      return s;
    }

    case 'skipEvent': {
      const card = findCard(content, s.eventId!);
      if (card.ignored) {
        applyEffects(s, card.ignored);
        if (card.ignored.setFlag) s.flags[card.ignored.setFlag] = true;
      }
      s.history.push({ month: s.month, cardId: card.id, choice: 'ignored' });
      if (!checkRecall(s, content, rng)) closeMonth(s, content, rng);
      return s;
    }

    case 'next': {
      if (s.phase === 'report') {
        s.eventId = null;
        if (monthOfDay(s.month) === 2) {
          s.polls.push(voteShare(s, 0));
          s.phase = 'dayEnd';
        } else {
          s.month += 1;
          startMonth(s, content, rng);
        }
      } else if (s.day >= 6) {
        s.day = 7;
        s.phase = 'campaign';
      } else {
        s.day += 1;
        s.month += 1;
        startMonth(s, content, rng);
      }
      return s;
    }
  }
}

export type Policy = (s: State, legal: Action[], content: Content, rand: () => number) => Action;

/** Play forward with a bot until `stop` says so (or the term ends). Used by the simulator and for missed days. */
export function autoplay(state: State, policy: Policy, content: Content, stop: (s: State) => boolean, rng: Rng = seededRng): State {
  let s = state;
  const rand = rng(`${s.playerSeed}|${s.weekId}|bot|${s.month}|${s.phase}|${s.history.length}`);
  for (let i = 0; i < 2000 && s.phase !== 'results' && !stop(s); i++) {
    s = reduce(s, policy(s, legalActions(s, content), content, rand), content, rng);
  }
  return s;
}
