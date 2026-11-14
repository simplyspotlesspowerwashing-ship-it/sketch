// Pure, deterministic rules engine. No DOM, no clock, no storage.
//   reduce(state, action, content, rng) -> new state
// Shared draws (desk order, rare cards, headlines) are keyed by week only, so every
// player sees the same thing. Deputy Dave's outcomes are keyed by player and month.
import { voteParts, voteShare } from './election.ts';
import { seededRng, shuffled } from './rng.ts';
import { TUNING } from './tuning.ts';
import { GROUPS } from './types.ts';
import type { Action, Card, Condition, Content, DeskSlot, Effects, GroupId, MonthReport, Option, Outcome_, Rng, State } from './types.ts';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const dayOfMonth = (month: number) => Math.ceil(month / 2);
export const monthOfDay = (month: number): 1 | 2 => (month % 2 === 1 ? 1 : 2);

/** Monthly approval fade for a group at this approval: popular mayors fade faster, unpopular ones stop falling. */
export function fadeFor(approval: number): number {
  return Math.round(clamp(TUNING.fade + (approval - 50) * TUNING.fadeSlope, 0, TUNING.fadeMax));
}

/** Favors it costs to send Deputy Dave instead of playing a card. With the cousin perk the first one each month is free. */
export function daveCost(s: State): number {
  return s.profile?.perk === 'cousin' && s.delegationsThisMonth === 0 ? 0 : TUNING.daveCost;
}

/** The group a card's mini-game penalty lands on. */
export function botchGroup(card: Card): GroupId {
  return card.group ?? GROUPS.find((g) => card.ignored?.[g]) ?? 'people';
}

/** What a sloppy (1) or flopped (0) mini-game costs on this card. */
export function botchCost(card: Card, skill: 0 | 1, urgent = false): { money: number; effects: Effects } {
  const b = skill === 0 ? TUNING.botch.flop : TUNING.botch.sloppy;
  return { money: b.money, effects: { [botchGroup(card)]: b.approval * (urgent ? TUNING.urgentIgnoreScale : 1) } };
}

const RIVAL: Record<GroupId, GroupId> = { people: 'business', business: 'people', law: 'press', press: 'law' };
const clean = (text: string, fallback: string) => text.replace(/[<>]/g, '').trim().slice(0, 18) || fallback;

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

/** The week's ordinary cards in a fixed shared order. The first 18 are the daily threes; the rest feed personal desks. */
function weekPool(content: Content, weekId: string, rng: Rng): string[] {
  return shuffled(content.pack.cards.filter((c) => !c.day && !c.requires && !c.rare && !c.secret).map((c) => c.id), rng(`${weekId}|pool`));
}

/**
 * Each day has two desks of three.
 *  - First: "today's three", the same for every mayor (so choices can be compared).
 *  - Second: "your town's three", drawn from your own situation: cards that follow from your choices,
 *    late-week crises, group-pressure cards, and then ordinary cards from whichever groups like you least.
 */
function drawDesk(s: State, content: Content, rng: Rng): DeskSlot[] {
  const { cards } = content.pack;
  const d = dayOfMonth(s.month);
  const pool = weekPool(content, s.weekId, rng);
  const nShared = TUNING.sharedPerDay * 6;
  const slots: DeskSlot[] = [];
  const add = (cardId: string, why: string, urgent = false) => slots.push({ cardId, status: 'open', why, ...(urgent ? { urgent: true } : {}) });

  if (monthOfDay(s.month) === 1) {
    for (const id of pool.slice((d - 1) * TUNING.sharedPerDay, d * TUNING.sharedPerDay)) add(id, 'shared');
    // Rare card: a shared 1-in-50 draw, so everyone who gets it gets it together.
    const rares = cards.filter((c) => c.rare);
    const r = rng(`${s.weekId}|rare|${s.month}`);
    if (rares.length > 0 && slots.length > 0 && r() < TUNING.rareChance) slots[0] = { cardId: rares[Math.floor(r() * rares.length)]!.id, status: 'open', why: 'shared' };
  } else {
    const maxUrgent = s.month >= TUNING.lateCrisisFromMonth ? 2 : 1;
    for (const c of cards) {
      if (slots.length >= maxUrgent) break;
      if (c.day || c.rare || !(c.requires || c.secret) || !holds(s, c.requires)) continue;
      if (!c.repeatable && s.usedCards.includes(c.id)) continue;
      const q = c.requires ?? {};
      add(c.id, q.flags || q.projects || c.secret ? 'choice' : q.fromMonth ? 'crisis' : `low:${c.group ?? 'people'}`, true);
    }
    // Fill the rest from the groups that like you least.
    const rest = pool.slice(nShared).filter((id) => !s.usedCards.includes(id));
    // Cards with no group (the treasurer, the librarian...) rank as your average, so they still turn up.
    const mean = GROUPS.reduce((n, g) => n + s.approval[g], 0) / GROUPS.length;
    const weak = (id: string) => { const g = findCard(content, id).group; return g ? s.approval[g] : mean - 1; };
    const ranked = rest.map((id, i) => ({ id, i })).sort((x, y) => weak(x.id) - weak(y.id) || x.i - y.i);
    for (const { id } of ranked) {
      if (slots.length >= TUNING.deskSize) break;
      const g = findCard(content, id).group;
      add(id, g && s.approval[g] < 50 ? `low:${g}` : 'town');
    }
  }
  for (const slot of slots) if (!s.usedCards.includes(slot.cardId)) s.usedCards.push(slot.cardId);
  return slots.slice(0, TUNING.deskSize);
}

function startMonth(s: State, content: Content, rng: Rng) {
  const protest = s.protestNext; // a protest makes every card this month URGENT
  s.protestNext = false;
  s.delegationsThisMonth = 0;
  s.monthTags = [];
  s.lastRecall = null;
  s.desk = drawDesk(s, content, rng);
  if (protest) for (const d of s.desk) d.urgent = true;
  s.actionsLeft = s.desk.length;
  s.duePromises = s.promises.filter((p) => p.dueMonth <= s.month).map((p) => p.id);
  s.decreeOffer = [];
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
  const report: MonthReport = { month: s.month, income: 0, projects: 0, decrees: 0, drift: {}, ignored: [], favorsGained: 0, combos: [], objectives: [], headline: '' };
  report.ignored = s.desk.filter((d) => d.status === 'ignored').map((d) => d.cardId);

  // Money
  const penalty = s.approval.business < T.low ? T.businessLowIncome : 1;
  report.income = Math.round(T.tax[s.tax].mult * (T.incomeBase + s.approval.business * T.incomePerBusiness) * penalty);
  for (const p of s.projects) report.projects += content.projects[p.id]!.monthly;
  for (const l of s.leases) report.projects += l.monthly;
  const enacted = content.pack.decrees.filter((d) => s.decrees.includes(d.id));
  for (const d of enacted) report.decrees += d.monthly ?? 0;
  s.money += report.income + report.projects + report.decrees;

  // Drift
  const drift: Effects = {};
  const add = (e: Effects | undefined) => {
    if (e) for (const g of GROUPS) if (e[g]) drift[g] = (drift[g] ?? 0) + e[g];
  };
  add({ people: T.tax[s.tax].people });
  for (const g of GROUPS) add({ [g]: -fadeFor(s.approval[g]) });
  for (const p of s.projects) add(content.projects[p.id]!.perMonth);
  for (const d of enacted) add(d.perMonth);
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
    v: 5, weekId, playerSeed, day: 1, month: 1, phase: 'desk',
    money: TUNING.startMoney, favors: TUNING.startFavors,
    approval: { people: a, business: a, law: a, press: a },
    tax: 'medium', actionsLeft: 0, delegationsThisMonth: 0, protestNext: false,
    desk: [], eventId: null, projects: [], leases: [], promises: [], duePromises: [], brokenPromises: 0,
    recalls: 0, lastRecall: null, flags: {}, objectivesDone: [], combosDone: [], usedCards: [], poolCursor: 0,
    monthTags: [], history: [], reports: [], polls: [], campaignEffect: 0, decrees: [], decreeOffer: [], decreesToday: 0, profile: null, daveDays: [], result: null,
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
    case 'decree':
      for (const id of s.decreeOffer) {
        const d = content.pack.decrees.find((x) => x.id === id)!;
        if (s.money + (d.money ?? 0) >= TUNING.bankruptAt) out.push({ type: 'decree', id });
      }
      out.push({ type: 'skipDecree' });
      break;
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
        card.options.forEach((o, option) => { if (!blocked(s, o, content)) out.push({ type: 'choose', cardId: card.id, option }); });
        if (daveCost(s) <= s.favors) out.push({ type: 'delegate', cardId: card.id });
      }
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
  if (action.type === 'setup' || action.type === 'rename') {
    const s: State = structuredClone(state);
    if (action.type === 'rename') {
      if (!s.profile) throw new Error('rename before setup');
      s.profile.mayor = clean(action.mayor, s.profile.mayor);
      s.profile.town = clean(action.town, s.profile.town);
      return s;
    }
    if (s.profile || s.phase === 'results') throw new Error('setup is only allowed once per term');
    const p = action.profile;
    s.profile = { mayor: clean(p.mayor, 'Mayor'), town: clean(p.town, 'Bad Town'), base: p.base, perk: p.perk };
    applyEffects(s, { [p.base]: TUNING.setup.base, [RIVAL[p.base]]: TUNING.setup.rival });
    if (p.perk === 'chest') s.money += TUNING.setup.chest;
    if (p.perk === 'friends') addFavors(s, TUNING.setup.friends);
    return s;
  }
  const bare = action.type === 'choose' ? { type: action.type, cardId: action.cardId, option: action.option } : action;
  const legal = legalActions(state, content).some((a) => JSON.stringify(a) === JSON.stringify(bare));
  if (!legal) throw new Error(`illegal action in phase ${state.phase}: ${JSON.stringify(action)}`);
  const s: State = structuredClone(state);

  switch (action.type) {
    case 'decree': {
      const d = content.pack.decrees.find((x) => x.id === action.id)!;
      s.decrees.push(d.id);
      s.money += d.money ?? 0;
      applyEffects(s, d.effects);
      if (d.setFlag) s.flags[d.setFlag] = true;
      s.monthTags.push(d.headlineTag ?? 'decree');
      s.decreeOffer = s.decreeOffer.filter((id) => id !== d.id);
      s.decreesToday += 1;
      if (checkRecall(s, content, rng)) return s;
      if (s.decreesToday >= TUNING.decreesPerDay || s.decreeOffer.length === 0) { s.decreeOffer = []; s.polls.push(voteShare(s, 0)); s.phase = 'dayEnd'; }
      return s;
    }

    case 'skipDecree':
      s.decreeOffer = [];
      s.polls.push(voteShare(s, 0));
      s.phase = 'dayEnd';
      return s;

    case 'setTax':
      s.tax = action.level;
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
      s.favors -= daveCost(s);
      s.delegationsThisMonth += 1;
      s.actionsLeft -= 1;
      s.monthTags.push('dave');
      s.history.push({ month: s.month, cardId: action.cardId, choice: 'dave', dave: outcome.id });
      checkRecall(s, content, rng);
      return s;
    }

    case 'choose': {
      const card = findCard(content, action.cardId);
      applyOption(s, card, action.option, content);
      const entry: State['history'][number] = { month: s.month, cardId: card.id, choice: action.option };
      const g = card.options[action.option]!.gamble;
      if (g) {
        // Luck is personal: two mayors making the same bet can get different results.
        entry.won = rng(`${s.playerSeed}|${s.weekId}|gamble|${s.month}|${card.id}`)() * 100 < g.chance;
        const out: Outcome_ = entry.won ? g.win : g.lose;
        s.money += out.money ?? 0;
        applyEffects(s, out.effects);
        if (out.setFlag) s.flags[out.setFlag] = true;
        s.monthTags.push(entry.won ? 'gambleWon' : 'gambleLost');
      }
      if (s.phase === 'desk' && card.game && action.skill !== undefined && action.skill < 2) {
        // Played badly: the same trade, but worse.
        const cost = botchCost(card, action.skill as 0 | 1, s.desk.find((d) => d.cardId === card.id)?.urgent);
        s.money += cost.money;
        applyEffects(s, cost.effects);
        s.monthTags.push(action.skill === 0 ? 'flop' : 'sloppy');
      }
      if (action.skill !== undefined) entry.skill = action.skill;
      s.history.push(entry);
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
          // The day's cards are done: now the Mayor's Hour. Three decrees, the same three for everyone.
          const fresh = content.pack.decrees.filter((d) => !s.decrees.includes(d.id)).map((d) => d.id);
          s.decreeOffer = shuffled(fresh, rng(`${s.weekId}|decrees|${s.day}`)).slice(0, TUNING.decreesOffered);
          s.decreesToday = 0;
          if (s.decreeOffer.length > 0) s.phase = 'decree';
          else { s.polls.push(voteShare(s, 0)); s.phase = 'dayEnd'; }
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
