import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { week1Content as content } from '../content/index.ts';
import { coverMissedDays } from '../engine/dave.ts';
import { voteShare } from '../engine/election.ts';
import { blocked, botchCost, campaignCard, daveCost, fadeFor, findCard, legalActions, monthOfDay, newTerm, reduce, upfront } from '../engine/engine.ts';
import { TUNING } from '../engine/tuning.ts';
import { GROUPS } from '../engine/types.ts';
import type { Action, Card, Decree, Effects, GroupId, Option, PerkId, Profile, Skill, State, TaxLevel } from '../engine/types.ts';
import { Aftermath, MiniGame } from './minigames.tsx';
import { Arrows, GROUP_COLOR, GROUP_NAME, Icon, LEADER, NAMES, Portrait, Sprite, Town } from './art.tsx';
import type { Burst, Mood, Pulse } from './art.tsx';
import { DAY_NAMES, calendar, loadSave, previewStats, setMuted, sfx, writeSave } from './platform.ts';
import type { Save } from './platform.ts';

const stats = previewStats;
const money = (k: number) => `${k < 0 ? '−' : ''}$${Math.abs(k)}k`;
const signed = (k: number) => `${k < 0 ? '−' : '+'}$${Math.abs(k)}k`;
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function boot(save: Save): State {
  const cal = calendar(save.dayOffset);
  const kept = save.state && save.state.v === 5 && save.state.weekId === cal.weekId && save.state.day <= cal.today ? save.state : null;
  return coverMissedDays(kept ?? newTerm(cal.weekId, save.playerSeed, content), content, cal.today);
}

/** Animate a number toward its new value. */
function useTween(target: number, ms = 450) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reduced()) { setV(target); from.current = target; return; }
    const start = from.current, t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const cur = start + (target - start) * (1 - Math.pow(1 - k, 3));
      setV(cur); from.current = cur;
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return Math.round(v);
}

// ---------- small pieces ----------

function MoneyChip({ value, suffix = '' }: { value: number; suffix?: string }) {
  return <span class={`chip money ${value < 0 ? 'down' : 'up'}`} aria-label={`${value < 0 ? 'costs' : 'gains'} ${Math.abs(value)} thousand dollars${suffix ? ' per month' : ''}`}><Icon.coin size={14} />{signed(value)}{suffix}</span>;
}

function EffectChips({ effects }: { effects: Effects | undefined }) {
  return <>{GROUPS.filter((g) => effects?.[g]).map((g) => <Arrows key={g} group={g} value={effects![g]!} />)}</>;
}

function BotchChips({ card, skill, urgent }: { card: Card; skill: 0 | 1; urgent?: boolean }) {
  const c = botchCost(card, skill, urgent);
  return <>{c.money ? <MoneyChip value={c.money} /> : null}<EffectChips effects={c.effects} /></>;
}

function OptionCosts({ o }: { o: Option }) {
  const p = o.project ? content.projects[o.project]! : null;
  const now = upfront(o, content);
  const merged: Effects = { ...o.effects };
  if (p?.onBuild) for (const g of GROUPS) if (p.onBuild[g]) merged[g] = (merged[g] ?? 0) + p.onBuild[g]!;
  return (
    <span class="costs">
      {now !== 0 && <MoneyChip value={now} />}
      {(o.monthly || p?.monthly) ? <MoneyChip value={(o.monthly ?? 0) + (p?.monthly ?? 0)} suffix="/mo" /> : null}
      {o.favors ? <span class="chip favor" aria-label={`${o.favors < 0 ? 'costs' : 'gains'} ${Math.abs(o.favors)} Favor`}><Icon.ticket size={14} />{o.favors < 0 ? '−' : '+'}{Math.abs(o.favors)}</span> : null}
      <EffectChips effects={merged} />
      {p?.perMonth && GROUPS.filter((g) => p.perMonth![g]).map((g) => <span key={g} class="chip monthly" style={{ '--g': GROUP_COLOR[g] }}><i class="dot" />{GROUP_NAME[g]} {p.perMonth![g]! > 0 ? '▲' : '▼'} each month</span>)}
      {p?.favorEvery && <span class="chip favor"><Icon.ticket size={14} />+1 every {p.favorEvery} months</span>}
      {o.promise && <span class="chip promise">Owe {money(o.promise.money)} in {o.promise.dueIn} months</span>}
      {o.campaign ? <span class="chip vote">Votes ▲ +{o.campaign}%</span> : null}
      {o.gamble && (
        <span class="gamble">
          <span class="odds"><b>{o.gamble.chance}%</b> it works</span>
          <span class="costs">{o.gamble.win.money ? <MoneyChip value={o.gamble.win.money} /> : null}<EffectChips effects={o.gamble.win.effects} /></span>
          <span class="odds bad"><b>{100 - o.gamble.chance}%</b> it doesn't</span>
          <span class="costs">{o.gamble.lose.money ? <MoneyChip value={o.gamble.lose.money} /> : null}<EffectChips effects={o.gamble.lose.effects} /></span>
        </span>
      )}
      {now === 0 && !Object.keys(merged).length && !o.campaign && !o.gamble && !o.monthly && <span class="chip">Free</span>}
    </span>
  );
}

function Meter({ g, s }: { g: GroupId; s: State }) {
  const v = s.approval[g];
  const shown = useTween(v);
  const prev = useRef(v);
  const [delta, setDelta] = useState(0);
  useEffect(() => {
    if (v !== prev.current) { setDelta(v - prev.current); prev.current = v; const t = setTimeout(() => setDelta(0), 1600); return () => clearTimeout(t); }
  }, [v]);
  const mood: Mood = v < TUNING.low ? 'annoyed' : v >= 65 ? 'pleased' : 'neutral';
  const state = v < TUNING.low ? 'low' : v > TUNING.high ? 'high' : '';
  return (
    <div class={`meter ${state}`} style={{ '--g': GROUP_COLOR[g] }} role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={v} aria-label={`${GROUP_NAME[g]} approval ${v}${state === 'low' ? ', dangerously low' : state === 'high' ? ', very high' : ''}`}>
      <Portrait who={LEADER[g]!} mood={mood} size={34} ring={GROUP_COLOR[g]} />
      <div class="meter-body">
        <div class="meter-top"><span>{GROUP_NAME[g]}</span><b>{shown}</b></div>
        <div class="bar"><i class="zone-low" /><i class="zone-high" /><i class="fill" style={{ width: `${v}%` }} /></div>
      </div>
      {delta !== 0 && <span class={`delta ${delta > 0 ? 'up' : 'down'}`}>{delta > 0 ? '▲' : '▼'}{Math.abs(delta)}</span>}
    </div>
  );
}

function Sheet({ children, onClose, label, tone }: { children: preact.ComponentChildren; onClose?: () => void; label: string; tone?: string }) {
  return (
    <div class="scrim" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div class={`sheet ${tone ?? ''}`} role="dialog" aria-modal="true" aria-label={label}>
        {onClose && <button class="close" onClick={onClose} aria-label="Close">×</button>}
        {children}
      </div>
    </div>
  );
}

interface Outcome { card: Card; option: number | 'dave'; daveText?: string; before: State; after: State; won?: boolean; skill?: Skill; urgent?: boolean }

function ResultPanel({ r, onDone }: { r: Outcome; onDone: () => void }) {
  const o = typeof r.option === 'number' ? r.card.options[r.option]! : null;
  const diff: Effects = {};
  for (const g of GROUPS) if (r.after.approval[g] !== r.before.approval[g] && r.after.recalls === r.before.recalls) diff[g] = r.after.approval[g] - r.before.approval[g];
  const dm = r.after.recalls === r.before.recalls ? r.after.money - r.before.money : 0;
  const own = r.card.group ? diff[r.card.group] ?? 0 : GROUPS.reduce((n, g) => n + (diff[g] ?? 0), 0);
  const mood: Mood = o ? (o.kind === 'refuse' || own < 0 || r.skill === 0 ? 'annoyed' : 'pleased') : 'neutral';
  const split = o ? stats.getSplit(r.after.weekId, r.card.id) : null;
  const pct = split && typeof r.option === 'number' ? split[r.option] ?? 0 : null;
  const stamp = !o ? "DAVE'D" : o.kind === 'refuse' ? 'DENIED' : o.kind === 'promise' ? 'PROMISED' : 'APPROVED';
  const UP = ['Lovely.', 'Finally.', 'Yes!', 'Good.'], DOWN = ['Hmph.', 'Rude.', 'Noted.', 'Wow.'];
  return (
    <div class="result">
      {o && r.card.game && r.skill !== undefined && <Aftermath card={r.card} skill={r.skill} />}
      <div class={`stamp ${!o ? 'dave' : o.kind === 'refuse' ? 'denied' : ''}`}>{stamp}</div>
      <div class="speaker">
        <Portrait who={o ? r.card.who : 'dave'} mood={mood} size={72} />
        <p class="bubble">{o ? o.reaction : r.daveText}</p>
      </div>
      {o && r.card.game && r.skill !== undefined && (
        <div class={`dice ${r.skill === 2 ? 'won' : 'lost'}`}>
          {r.skill === 2 ? <><b>A clean job.</b> You got exactly the deal you chose.</> : <><b>{r.skill === 1 ? 'Sloppy.' : 'Disaster.'}</b> {r.skill === 0 ? r.card.game.flop : 'It got done. Not well.'} <span class="costs"><BotchChips card={r.card} skill={r.skill as 0 | 1} urgent={r.urgent} /></span></>}
        </div>
      )}
      {o?.gamble && r.won !== undefined && <div class={`dice ${r.won ? 'won' : 'lost'}`}><b>{r.won ? 'It worked!' : 'It did not work.'}</b> {(r.won ? o.gamble.win : o.gamble.lose).text}</div>}
      <div class="reactions">
        {dm !== 0 && <MoneyChip value={dm} />}
        {GROUPS.filter((g) => diff[g]).map((g, i) => (
          <span key={g} class="react" style={{ 'animation-delay': `${120 + i * 110}ms` }}>
            <Portrait who={LEADER[g]!} mood={diff[g]! > 0 ? 'pleased' : 'annoyed'} size={30} ring={GROUP_COLOR[g]} />
            <Arrows group={g} value={diff[g]!} />
            <em>{(diff[g]! > 0 ? UP : DOWN)[(r.card.id.length + i) % 4]}</em>
          </span>
        ))}
      </div>
      {pct !== null && (
        <div class={`crowd ${pct < 15 ? 'maverick' : ''}`}>
          <div class="crowd-bar"><i style={{ width: `${Math.max(3, pct)}%` }} /></div>
          <p><b>{pct}%</b> of mayors did this {pct < 15 && <span class="mav">Maverick!</span>} {stats.preview && <span class="tag">preview data</span>}</p>
        </div>
      )}
      <button class="btn primary" onClick={onDone} autoFocus>Carry on</button>
    </div>
  );
}

function CardSheet({ card, s, mode, urgent, onChoose, onDave, onSkip, onClose }: {
  card: Card; s: State; mode: 'desk' | 'event' | 'campaign'; urgent?: boolean;
  onChoose: (i: number) => void; onDave?: () => void; onSkip?: () => void; onClose?: () => void;
}) {
  const [advice, setAdvice] = useState(false);
  const noActions = false;
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= card.options.length && !noActions && !blocked(s, card.options[n - 1]!, content)) onChoose(n - 1);
      else if (e.key.toLowerCase() === 'd' && onDave) onDave();
      else if (e.key === 'Escape') onClose?.();
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  });
  return (
    <>
      {urgent && <div class="ribbon">URGENT · a bad job here costs double</div>}
      <div class="speaker">
        <Portrait who={card.who} size={76} ring={card.group ? GROUP_COLOR[card.group] : undefined} />
        <div><div class="who">{NAMES[card.who] ?? card.who}{card.rare && <span class="tag rare">RARE</span>}</div><p class="bubble">{card.text}</p></div>
      </div>
      {card.advisors && (
        <div class="advice">
          <button class="link" onClick={() => { setAdvice(!advice); sfx('tap'); }} aria-expanded={advice}>? What do the others think</button>
          {advice && card.advisors.map((a) => <div key={a.who} class="adv"><Portrait who={a.who} size={30} /><span><b>{(NAMES[a.who] ?? a.who).split(',')[0]}:</b> {a.line}</span></div>)}
        </div>
      )}
      {mode === 'desk' && card.game && (
        <div class="stakes">
          <span class="stakes-top"><Sprite theme={card.game.theme} size={26} /><b>Then you'll have to: {card.game.title}</b></span>
          <span class="costs"><span class="odds">Sloppy</span><BotchChips card={card} skill={1} urgent={urgent} /><span class="odds bad">Flop</span><BotchChips card={card} skill={0} urgent={urgent} /></span>
        </div>
      )}
      <div class="options">
        {card.options.map((o, i) => {
          const why = blocked(s, o, content);
          return (
            <button key={o.label} class={`option ${o.kind}`} disabled={noActions || Boolean(why)} onClick={() => onChoose(i)}>
              <span class="opt-top"><kbd>{i + 1}</kbd><b>{o.label}</b>{why && <span class="why">{why}</span>}</span>
              <OptionCosts o={o} />
            </button>
          );
        })}
      </div>
      <div class="sheet-foot">
        {onDave && <button class="btn dave" onClick={onDave}><Portrait who="dave" size={28} /> Send Dave instead <small>{daveCost(s) ? `costs ${daveCost(s)} Favor · no game · anything could happen` : 'free this once · no game · anything could happen'}</small></button>}
        {onSkip && <button class="btn ghost" onClick={onSkip}>Do nothing <span class="costs"><EffectChips effects={card.ignored} /></span></button>}
      </div>
    </>
  );
}

function Bugle({ kicker, headline, children }: { kicker: string; headline: string; children: preact.ComponentChildren }) {
  return (
    <div class="bugle">
      <div class="masthead"><span>THE BUGLE</span><small>{kicker}</small></div>
      <h2>{headline}</h2>
      {children}
    </div>
  );
}

function Gauge({ value }: { value: number }) {
  const shown = useTween(value, 1100);
  const a = Math.PI * (1 - shown / 100);
  const x = 100 + 78 * Math.cos(a), y = 100 - 78 * Math.sin(a);
  return (
    <svg class="gauge" viewBox="0 0 200 118" role="img" aria-label={`Poll: ${value} percent`}>
      <path d="M22 100 A78 78 0 0 1 178 100" fill="none" stroke="#E6DBC6" stroke-width="16" stroke-linecap="round" />
      <path d="M22 100 A78 78 0 0 1 100 22" fill="none" stroke="#C23B3B" stroke-width="16" stroke-linecap="round" opacity=".35" />
      <path d={`M22 100 A78 78 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`} fill="none" stroke={shown >= 50 ? '#3F8F5A' : '#C23B3B'} stroke-width="16" stroke-linecap="round" />
      <path d="M100 14 v18" stroke="#29231F" stroke-width="3" stroke-dasharray="3 3" />
      <text x="100" y="98" text-anchor="middle" font-size="40" font-weight="700" fill="#29231F" font-family="Fredoka, sans-serif">{shown}%</text>
      <text x="100" y="114" text-anchor="middle" font-size="10" fill="#6B6257" font-family="Fredoka, sans-serif">50% wins</text>
    </svg>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState('');
  return (
    <>
      <pre class="share">{text}</pre>
      <button class="btn" onClick={() => {
        sfx('tap');
        const share = (navigator as Navigator & { share?: (d: { text: string }) => Promise<void> }).share;
        if (share) { share.call(navigator, { text }).catch(() => {}); return; }
        try { navigator.clipboard.writeText(text).then(() => setDone('Copied'), () => setDone('Select the text above to copy')); } catch { setDone('Select the text above to copy'); }
      }}>{done || label}</button>
    </>
  );
}

// ---------- election night ----------
function Results({ s, onNewWeek }: { s: State; onNewWeek: () => void }) {
  const r = s.result!;
  const rows: [string, number, string?][] = [
    ['People', r.parts.people, GROUP_COLOR.people], ['Business', r.parts.business, GROUP_COLOR.business], ['Law', r.parts.law, GROUP_COLOR.law], ['Press', r.parts.press, GROUP_COLOR.press],
    ['Objectives', r.parts.objectives], ['Campaign', r.parts.campaign], ['Broken promises', r.parts.promises], ['Recalls', r.parts.recalls],
  ];
  const visible = rows.filter(([, v], i) => i < 4 || v !== 0);
  const [step, setStep] = useState(reduced() ? visible.length + 1 : 0);
  useEffect(() => {
    if (step > visible.length) return;
    if (step === 0) sfx('drum');
    const t = setTimeout(() => { setStep(step + 1); if (step === visible.length) sfx(r.won ? 'win' : 'lose'); else sfx('tap'); }, step === visible.length ? 1100 : 750);
    return () => clearTimeout(t);
  }, [step]);
  const done = step > visible.length;
  const beat = stats.getPercentile(s.weekId, r.share);
  const text = `${s.profile?.town ?? 'Bad Town'} · Week of ${s.weekId} — ${r.won ? 'Re-elected' : 'Voted out'} with ${r.share}% · beat ${beat}% of mayors · ${s.projects.length} projects${s.recalls ? ` · ${s.recalls} recall${s.recalls > 1 ? 's' : ''}` : ''}`;
  return (
    <div class="panel election">
      <h2 class="display">Election night</h2>
      {r.endedEarly && <p class="hint warn">Your term ended early after a third recall.</p>}
      <div class="districts">
        {visible.map(([name, v, color], i) => (
          <div key={name} class={`district ${i < step ? 'in' : ''}`} style={{ '--g': color ?? '#6B6257' }}>
            <span><i class="dot" />{name}{i < 4 ? ' district' : ''}</span><b class={v >= 0 ? 'up' : 'down'}>{v >= 0 ? '▲ +' : '▼ −'}{Math.abs(Math.round(v * 10) / 10)}</b>
          </div>
        ))}
      </div>
      {done && (
        <div class="verdict">
          <Gauge value={r.share} />
          <div class={`banner ${r.won ? 'won' : 'lost'}`}>{r.won ? 'RE-ELECTED' : 'VOTED OUT'}</div>
          <p>{r.won ? 'The town has spoken. Mostly in honks.' : 'The traffic cone will be sworn in at noon.'}</p>
          <p class="hint">You beat <b>{beat}%</b> of mayors {stats.preview && <span class="tag">preview data</span>}</p>
          <ul class="legacy">
            <li>Built: {s.projects.map((p) => content.projects[p.id]!.name).join(', ') || 'nothing at all'}</li>
            <li>Decrees: {s.decrees.map((id) => content.pack.decrees.find((d) => d.id === id)!.name).join(', ') || 'none'}</li>
            <li>Objectives: {s.objectivesDone.length} of {content.pack.objectives.length}</li>
            <li>Promises broken: {s.brokenPromises} · Recalls: {s.recalls}</li>
            {s.daveDays.length > 0 && <li>Days Dave was in charge: {s.daveDays.map((d) => DAY_NAMES[d - 1]).join(', ')}</li>}
          </ul>
          <CopyButton text={text} label="Share result" />
          <button class="btn ghost" onClick={onNewWeek}>Start the next week now <small>preview only</small></button>
        </div>
      )}
    </div>
  );
}

function DecreeCosts({ d, ongoing }: { d: Decree; ongoing?: boolean }) {
  return (
    <span class="costs">
      {!ongoing && d.money ? <MoneyChip value={d.money} /> : null}
      {d.monthly ? <MoneyChip value={d.monthly} suffix="/mo" /> : null}
      {!ongoing && <EffectChips effects={d.effects} />}
      {d.perMonth && GROUPS.filter((g) => d.perMonth![g]).map((g) => <span key={g} class="chip monthly" style={{ '--g': GROUP_COLOR[g] }}><i class="dot" />{GROUP_NAME[g]} {d.perMonth![g]! > 0 ? '▲' : '▼'} each month</span>)}
    </span>
  );
}

// ---------- guide, timeline, setup ----------
const whyText = (why: string) => why.startsWith('low:') ? `${GROUP_NAME[why.slice(4) as GroupId]} is unhappy` : why === 'choice' ? 'You did this' : why === 'crisis' ? 'Late-week crisis' : 'Around town';

function alerts(s: State): { text: string; bad: boolean }[] {
  const out: { text: string; bad: boolean }[] = [];
  const a = s.approval;
  if (s.money < 0) out.push({ text: `In debt. Recall at −$${-TUNING.bankruptAt}k`, bad: true });
  if (a.people < TUNING.low) out.push({ text: 'Protest: every card is URGENT next month', bad: true });
  if (a.business < TUNING.low) out.push({ text: 'Business is sulking: income −30%', bad: true });
  if (a.law < TUNING.low) out.push({ text: 'Crime wave: expect crime cards', bad: true });
  if (a.press < TUNING.low) out.push({ text: 'Bad press: −5 at the polls', bad: true });
  for (const g of GROUPS) if (a[g] <= 12) out.push({ text: `${GROUP_NAME[g]} near zero: recall risk`, bad: true });
  for (const g of GROUPS) if (a[g] > TUNING.high) out.push({ text: `${GROUP_NAME[g]} adore you. They'll want things`, bad: false });
  for (const p of s.promises) out.push({ text: `Promise: ${money(p.money)} due in ${Math.max(0, p.dueMonth - s.month)} mo`, bad: p.dueMonth - s.month <= 1 });
  return out;
}

function Guide({ s, open, first }: { s: State; open: number; first: boolean }) {
  const step = open === 0 ? 'Desk clear.' : `${open} to go. Pick your trade, then do the job yourself.`;
  const list = alerts(s);
  return (
    <div class="guide">
      <p class="step"><span class="num">{monthOfDay(s.month) === 1 ? '1 of 3' : '2 of 3'}</span><b>{step}</b></p>
      {first && <p class="hint">Tap a request. Every choice costs something, and every one ends in a short game. Play it well or the deal gets worse.</p>}
      {list.length > 0 && <div class="alerts">{list.map((x) => <span key={x.text} class={`alert ${x.bad ? 'bad' : ''}`}>{x.bad ? '!' : '★'} {x.text}</span>)}</div>}
    </div>
  );
}

function Timeline({ s }: { s: State }) {
  return (
    <ol class="timeline" aria-label="The week so far">
      {DAY_NAMES.map((d, i) => {
        const day = i + 1;
        const poll = s.polls[i];
        const cls = day === s.day ? 'now' : day < s.day ? 'past' : '';
        return <li key={d} class={cls} aria-current={day === s.day ? 'step' : undefined}><span>{d}</span><b>{day === 7 ? (s.result ? `${s.result.share}%` : 'Vote') : poll !== undefined ? `${poll}%` : day < s.day ? '·' : ''}</b>{s.daveDays.includes(day) && <i>Dave</i>}</li>;
      })}
    </ol>
  );
}

const TOWNS = ['Lower Honk', 'Dampford', 'Mildew Falls', 'Greater Oops', 'Bin Valley', 'Port Regret', 'Upper Crumb', 'Sogwick', 'New Mistake', 'Little Fuss', 'Gravy Bend', 'Wobbleton'];
const MAYORS = ['Mayor Biscuit', 'Mayor Pat', 'Mayor Wobble', 'Mayor Jo', 'Mayor Crumb', 'Mayor Sam', 'Mayor Pickle', 'Mayor Lou', 'Mayor Noodle', 'Mayor Max'];
const pickOne = (list: string[], not = '') => { let v = not; while (v === not) v = list[Math.floor(Math.random() * list.length)]!; return v; };
const PERKS: { id: PerkId; name: string; what: string }[] = [
  { id: 'chest', name: 'A war chest', what: `Start with +$${TUNING.setup.chest}k` },
  { id: 'friends', name: 'Friends at The Bugle', what: `Start with +${TUNING.setup.friends} Favors` },
  { id: 'cousin', name: "Dave's cousin", what: 'Each month, sending Dave once is free' },
];
const RIVALS: Record<GroupId, GroupId> = { people: 'business', business: 'people', law: 'press', press: 'law' };

function NameField({ id, label, value, onInput, onDice }: { id: string; label: string; value: string; onInput: (v: string) => void; onDice: () => void }) {
  return (
    <label class="field" for={id}><span>{label}</span>
      <span class="field-row"><input id={id} value={value} maxLength={18} autocomplete="off" onInput={(e) => onInput((e.target as HTMLInputElement).value)} />
        <button type="button" class="icon" aria-label={`Random ${label.toLowerCase()}`} onClick={onDice}><Icon.dice /></button></span>
    </label>
  );
}

function Setup({ onDone, late }: { onDone: (p: Profile) => void; late: boolean }) {
  const [mayor, setMayor] = useState(() => pickOne(MAYORS));
  const [town, setTown] = useState(() => pickOne(TOWNS));
  const [base, setBase] = useState<GroupId>('people');
  const [perk, setPerk] = useState<PerkId>('chest');
  return (
    <Sheet label="Set up your town">
      <h2 class="display">One day down. Make it official.</h2>
      {late && <p class="hint">Dave has been keeping your chair warm since Monday. Literally. Don't ask.</p>}
      <NameField id="mayor-name" label="Your name" value={mayor} onInput={setMayor} onDice={() => { setMayor(pickOne(MAYORS, mayor)); sfx('tap'); }} />
      <NameField id="town-name" label="Your town" value={town} onInput={setTown} onDice={() => { setTown(pickOne(TOWNS, town)); sfx('tap'); }} />
      <fieldset class="pick"><legend>Who got you elected?</legend>
        <div class="pick-grid">
          {GROUPS.map((g) => (
            <button type="button" key={g} class={`pick-btn ${base === g ? 'on' : ''}`} aria-pressed={base === g} style={{ '--g': GROUP_COLOR[g] }} onClick={() => { setBase(g); sfx('tap'); }}>
              <Portrait who={LEADER[g]!} size={40} ring={GROUP_COLOR[g]} mood={base === g ? 'pleased' : RIVALS[base] === g ? 'annoyed' : 'neutral'} />
              <span><b>{GROUP_NAME[g]}</b><small>{base === g ? `▲ +${TUNING.setup.base}` : RIVALS[base] === g ? `▼ ${TUNING.setup.rival}` : ' '}</small></span>
            </button>
          ))}
        </div>
        <p class="hint">Your base gets +{TUNING.setup.base} right now. Their rivals ({GROUP_NAME[RIVALS[base]]}) get {TUNING.setup.rival}.</p>
      </fieldset>
      <fieldset class="pick"><legend>Pick one head start</legend>
        <div class="options">
          {PERKS.map((p) => <button type="button" key={p.id} class={`option ${perk === p.id ? 'current' : ''}`} aria-pressed={perk === p.id} onClick={() => { setPerk(p.id); sfx('tap'); }}><span class="opt-top"><b>{p.name}</b></span><span class="costs"><span class="chip">{p.what}</span></span></button>)}
        </div>
      </fieldset>
      <button class="btn primary" onClick={() => onDone({ mayor, town, base, perk })}>Sign the paperwork</button>
      <p class="hint">You can change the names later. The rest is permanent, like most mistakes.</p>
    </Sheet>
  );
}

function Names({ profile, onSave, onClose }: { profile: Profile; onSave: (mayor: string, town: string) => void; onClose: () => void }) {
  const [mayor, setMayor] = useState(profile.mayor);
  const [town, setTown] = useState(profile.town);
  return (
    <Sheet label="Change names" onClose={onClose}>
      <h2 class="display">Rename things</h2>
      <NameField id="mayor-rename" label="Your name" value={mayor} onInput={setMayor} onDice={() => setMayor(pickOne(MAYORS, mayor))} />
      <NameField id="town-rename" label="Your town" value={town} onInput={setTown} onDice={() => setTown(pickOne(TOWNS, town))} />
      <button class="btn primary" onClick={() => onSave(mayor, town)}>Save. Repaint the sign.</button>
    </Sheet>
  );
}

// ---------- app ----------
export function App() {
  const [save, setSave] = useState<Save>(() => { const sv = loadSave(); setMuted(sv.muted); return sv; });
  const [s, setS] = useState<State>(() => boot(save));
  const [focus, setFocus] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [overlay, setOverlay] = useState<'tax' | 'dev' | 'recall' | 'names' | null>(null);
  const [pulse, setPulse] = useState<Pulse | null>(null);
  const [burst, setBurst] = useState<Burst | null>(null);
  const [playing, setPlaying] = useState<{ card: Card; option: number } | null>(null);
  const [lawBook, setLawBook] = useState(false);
  const [enacted, setEnacted] = useState<Decree | null>(null);
  const taps = useRef<number[]>([]);
  const cal = useMemo(() => calendar(save.dayOffset), [save.dayOffset]);
  const introKey = `${s.weekId}:${s.day}`;
  const needSetup = !s.profile && s.phase === 'dayEnd'; // you name yourself and the town once your first day is done
  const showIntro = !needSetup && save.introSeen !== introKey && s.phase !== 'results' && s.phase !== 'dayEnd';

  const persist = (next: State, patch: Partial<Save> = {}) => {
    const sv = { ...save, ...patch, state: next };
    setSave(sv); setS(next); writeSave(sv);
  };
  useEffect(() => { writeSave({ ...save, state: s }); }, []);

  const act = (a: Action): State => {
    const next = reduce(s, a, content);
    const recalled = next.recalls > s.recalls;
    persist(next, a.type === 'choose' || a.type === 'delegate' ? { tutorialDone: true } : {});
    if (recalled) { setOverlay('recall'); sfx('warn'); }
    if (a.type === 'choose' || a.type === 'delegate') stats.recordChoice(s.weekId, a.cardId, a.type === 'choose' ? a.option : -1);
    return next;
  };

  const choose = (card: Card, option: number, skill?: Skill) => {
    const before = s;
    const o = card.options[option]!;
    if (before.phase === 'desk' && card.game && skill === undefined) { setPlaying({ card, option }); sfx('paper'); return; }
    setPlaying(null);
    const urgent = before.desk.find((d) => d.cardId === card.id)?.urgent;
    const after = act({ type: 'choose', cardId: card.id, option, ...(skill !== undefined ? { skill } : {}) });
    sfx('stamp');
    setTimeout(() => sfx(card.who === 'gerald' ? 'honk' : upfront(o, content) > 0 ? 'coin' : upfront(o, content) < 0 ? 'spend' : 'tap'), 180);
    const won = after.history[after.history.length - 1]?.won;
    if (o.gamble) setTimeout(() => sfx(won ? 'win' : 'lose'), 420);
    bump(before, after);
    if (skill !== undefined) setBurst({ key: Date.now(), skill });
    if (before.phase === 'desk' || o.gamble) setOutcome({ card, option, before, after, won, skill, urgent });
    else setFocus(null);
  };
  const enact = (d: Decree) => {
    const before = s;
    const after = act({ type: 'decree', id: d.id });
    sfx('stamp');
    bump(before, after);
    setEnacted(d);
  };
  const delegate = (card: Card) => {
    const before = s;
    const after = act({ type: 'delegate', cardId: card.id });
    const id = after.history[after.history.length - 1]!.dave;
    sfx('stamp');
    bump(before, after);
    setOutcome({ card, option: 'dave', daveText: content.pack.dave.outcomes.find((d) => d.id === id)?.text, before, after });
  };
  const closeCard = () => { setFocus(null); setOutcome(null); setPlaying(null); };
  const bump = (before: State, after: State) => {
    if (after.recalls !== before.recalls) return;
    const effects: Effects = {};
    for (const g of GROUPS) if (after.approval[g] !== before.approval[g]) effects[g] = after.approval[g] - before.approval[g];
    setPulse({ key: Date.now(), effects });
  };

  const jump = (days: number) => {
    const sv = { ...save, dayOffset: save.dayOffset + days, state: s };
    const next = boot(sv);
    setOverlay(null); setFocus(null); setOutcome(null);
    setSave({ ...sv, state: next }); setS(next); writeSave({ ...sv, state: next });
  };
  const reset = () => {
    const sv: Save = { ...save, state: null, introSeen: '', dayOffset: 0, tutorialDone: false };
    const next = boot(sv);
    setOverlay(null); setFocus(null); setOutcome(null);
    setSave({ ...sv, state: next }); setS(next); writeSave({ ...sv, state: next });
  };

  // When every card on the desk is dealt with, the day moves on by itself.
  useEffect(() => {
    if (s.phase !== 'desk' || focus || outcome || playing || overlay || showIntro) return;
    if (s.desk.some((d) => d.status === 'open')) return;
    const t = setTimeout(() => { act({ type: 'endDesk' }); sfx('paper'); }, 700);
    return () => clearTimeout(t);
  });

  // Enter advances simple screens.
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || focus || overlay) return;
      if (showIntro) persist(s, { introSeen: introKey });
      else if (s.phase === 'report') { act({ type: 'next' }); sfx('paper'); }
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  });

  const titleTap = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 700), now];
    if (taps.current.length >= 3) { taps.current = []; setOverlay('dev'); }
  };

  const shownMoney = useTween(s.money);
  const legal = legalActions(s, content);
  const openCards = s.desk.filter((d) => d.status === 'open').length;
  const focusCard = focus ? findCard(content, focus) : null;
  const focusSlot = s.desk.find((d) => d.cardId === focus);
  const report = s.reports[s.reports.length - 1];
  const lastPoll = s.polls[s.polls.length - 1];
  const prevPoll = s.polls[s.polls.length - 2];
  const m = monthOfDay(s.month);
  const dayName = DAY_NAMES[s.day - 1]!;
  const income = Math.round(TUNING.tax[s.tax].mult * (TUNING.incomeBase + s.approval.business * TUNING.incomePerBusiness) * (s.approval.business < TUNING.low ? TUNING.businessLowIncome : 1));
  const shareDay = `${s.profile?.town ?? 'Bad Town'} · Week of ${s.weekId} · ${dayName} — Poll ${lastPoll ?? voteShare(s, 0)}% ${prevPoll === undefined ? '' : (lastPoll ?? 0) >= prevPoll ? '▲' : '▼'} · ${money(s.money)} · ${s.projects.length} project${s.projects.length === 1 ? '' : 's'}${s.promises.length ? ` · ${s.promises.length} promise${s.promises.length > 1 ? 's' : ''} due` : ''}`;

  return (
    <div class={`app day${s.day}`}>
      <header class="top">
        <h1 onClick={titleTap}>Mayor of <span>{s.profile?.town ?? 'Bad Town'}</span></h1>
        <div class="top-right">
          <span class="daychip">{dayName}{s.day <= 6 && s.phase !== 'dayEnd' ? (s.phase === 'decree' ? " · Mayor's Hour" : m === 1 ? " · today's three" : " · your town's three") : ''}</span>
          {s.profile && <button class="icon" aria-label="Change your name or the town's name" onClick={() => { setOverlay('names'); sfx('tap'); }}><Icon.pen /></button>}
          <button class="icon" aria-label={save.muted ? 'Turn sound on' : 'Turn sound off'} onClick={() => { setMuted(!save.muted); persist(s, { muted: !save.muted }); }}><Icon.sound on={!save.muted} /></button>
        </div>
      </header>

      <Town s={s} pulse={pulse} scene={playing?.card.game?.theme} burst={burst} />
      <Timeline s={s} />

      <section class="hud" aria-label="Town status">
        <button class={`stat money ${s.money < 0 ? 'neg' : ''}`} onClick={() => { setOverlay('tax'); sfx('tap'); }} aria-label={`Money ${money(s.money)}. Income ${income} thousand a month. Tax ${s.tax}. Change tax`}>
          <Icon.coin size={18} /><b>{money(shownMoney)}</b><small>+${income}k/mo · tax {s.tax} ▾</small>
        </button>
        <button class="stat" onClick={() => { setLawBook(true); sfx('tap'); }} aria-label={`${s.decrees.length} decrees in force. Open the law book`}><Icon.scroll /><b>{s.decrees.length}</b><small>Decrees ▾</small></button>
        <div class="stat" aria-label={`${s.favors} Favors`}><Icon.ticket size={18} /><b>{s.favors}</b><small>Favors</small></div>
        <div class="stat" aria-label={`${openCards} requests left this month`}><span class="pips">{s.desk.map((d) => <i key={d.cardId} class={d.status === 'open' ? 'on' : ''} />)}</span><small>To do</small></div>
      </section>
      <section class="meters">{GROUPS.map((g) => <Meter key={g} g={g} s={s} />)}</section>

      {s.phase === 'desk' && (
        <main class="desk">
          <Guide s={s} open={openCards} first={!save.tutorialDone} />
          <h2 class="deskhead">{m === 1 ? <>Today's three <small>every mayor gets these</small></> : <>Your town's three <small>because of how things are going</small></>}</h2>
          <div class="cards">
            {s.desk.map((slot, i) => {
              const card = findCard(content, slot.cardId);
              const done = slot.status !== 'open';
              return (
                <button key={slot.cardId} class={`paper tilt${i % 3} ${done ? 'done' : ''} ${slot.urgent ? 'urgent' : ''}`} disabled={done} onClick={() => { setFocus(card.id); sfx('paper'); }}>
                  {slot.urgent && <span class="ribbon small">URGENT</span>}
                  {m === 2 && slot.why && <span class="why-chip" style={{ '--g': slot.why.startsWith('low:') ? GROUP_COLOR[slot.why.slice(4) as GroupId] : '#6B6257' }}>{whyText(slot.why)}</span>}
                  {card.game && !done && <span class="paper-game"><Sprite theme={card.game.theme} size={22} /></span>}
                  <Portrait who={card.who} size={40} ring={card.group ? GROUP_COLOR[card.group] : undefined} />
                  <span class="paper-text"><b>{(NAMES[card.who] ?? card.who).split(',')[0]}{card.rare ? ' · RARE' : ''}</b>{card.text}</span>
                  {done && <span class={`stamp mini ${slot.status === 'dave' ? 'dave' : card.options[slot.option ?? 0]?.kind === 'refuse' ? 'denied' : ''}`}>{slot.status === 'dave' ? "DAVE'D" : card.options[slot.option ?? 0]?.kind === 'refuse' ? 'DENIED' : 'DONE'}</span>}
                </button>
              );
            })}
          </div>
          {openCards > 0 && !legal.some((x) => x.type === 'choose') && <button class="btn" onClick={() => { act({ type: 'endDesk' }); sfx('paper'); }}>Nothing more can be done here. Move on</button>}
          <button class="hourstrip" onClick={() => { setLawBook(true); sfx('tap'); }}><Icon.scroll /><span><b>Mayor's Hour comes after today's six cards.</b> You may enact up to {TUNING.decreesPerDay} decrees. {s.decrees.length} in force.</span></button>
        </main>
      )}

      {s.phase === 'decree' && !needSetup && !showIntro && (
        <main class="panel">
          <div class="guide"><p class="step"><span class="num">3 of 3</span><b>Mayor's Hour: enact up to {TUNING.decreesPerDay} things. {TUNING.decreesPerDay - s.decreesToday} left.</b></p><p class="hint">Nobody asked for these. That's the fun. A decree lasts all week. Every mayor is offered the same ones today.</p></div>
          <div class="options">
            {s.decreeOffer.map((id) => {
              const d = content.pack.decrees.find((x) => x.id === id)!;
              const ok = legal.some((a) => a.type === 'decree' && a.id === id);
              return (
                <button key={id} class={`option decree ${d.kind}`} disabled={!ok} onClick={() => enact(d)}>
                  <span class="opt-top"><span class="kind">{d.kind}</span><b>{d.name}</b></span>
                  <span class="decree-text">{d.text}</span>
                  <DecreeCosts d={d} />
                </button>
              );
            })}
          </div>
          <button class="btn primary" onClick={() => { act({ type: 'skipDecree' }); sfx('paper'); }}>{s.decreesToday > 0 ? "That's enough law for one day" : 'Enact nothing today'}</button>
        </main>
      )}

      {s.phase === 'promises' && (
        <main class="panel">
          <h2 class="display">Promises due</h2>
          {s.duePromises.map((id) => {
            const p = s.promises.find((x) => x.id === id)!;
            const canPay = legal.some((a) => a.type === 'resolvePromise' && a.id === id && a.pay);
            return (
              <div key={id} class="promise-row">
                <div class="speaker"><Portrait who={findCard(content, p.cardId).who} size={56} /><p class="bubble">You promised: “{p.label}”. That's {money(p.money)}. Today.</p></div>
                <div class="options">
                  <button class="option" disabled={!canPay} onClick={() => { act({ type: 'resolvePromise', id, pay: true }); sfx('spend'); }}><span class="opt-top"><b>Keep the promise</b></span><span class="costs"><MoneyChip value={-p.money} /></span></button>
                  <button class="option refuse" onClick={() => { act({ type: 'resolvePromise', id, pay: false }); sfx('warn'); }}><span class="opt-top"><b>Break it</b></span><span class="costs"><EffectChips effects={Object.fromEntries(GROUPS.filter((g) => (p.gain[g] ?? 0) > 0).map((g) => [g, -2 * p.gain[g]!]))} /><span class="chip vote down">Votes ▼ −4%</span></span></button>
                </div>
              </div>
            );
          })}
        </main>
      )}

      {s.phase === 'report' && report && (
        <main class="panel">
          <Bugle kicker={`${dayName} · ${m === 1 ? 'midday' : 'evening'} edition`} headline={report.headline}>
            <table class="ledger">
              <tbody>
                <tr><td>Tax income</td><td class="up">{signed(report.income)}</td></tr>
                {report.decrees !== 0 && <tr><td>Your decrees</td><td class={report.decrees < 0 ? 'down' : 'up'}>{signed(report.decrees)}</td></tr>}
                {report.projects !== 0 && <tr><td>Projects and leases</td><td class={report.projects < 0 ? 'down' : 'up'}>{signed(report.projects)}</td></tr>}
                {report.favorsGained > 0 && <tr><td>Favors from the press</td><td class="up">+{report.favorsGained}</td></tr>}
                <tr><td>The mood this month</td><td><span class="costs"><EffectChips effects={report.drift} /></span></td></tr>
              </tbody>
            </table>
            {report.ignored.length > 0 && <p class="hint warn">Left on the desk: {report.ignored.map((id) => (NAMES[findCard(content, id).who] ?? '').split(',')[0]).join(', ')}. They noticed.</p>}
            {report.combos.map((id) => { const c = content.combos.find((x) => x.id === id)!; return <p key={id} class="bonus"><b>Combo: {c.name}!</b> {c.text}</p>; })}
            {report.objectives.map((id) => <p key={id} class="bonus"><b>Objective done:</b> {content.pack.objectives.find((o) => o.id === id)!.text} <span class="chip vote">Votes ▲ +2%</span></p>)}
            {s.promises.length > 0 && <p class="hint">Promises outstanding: {s.promises.map((p) => `${money(p.money)} in ${Math.max(0, p.dueMonth - s.month)} mo`).join(' · ')}</p>}
          </Bugle>
          <button class="btn primary" onClick={() => { act({ type: 'next' }); sfx('paper'); }} autoFocus>{m === 2 ? "On to the Mayor's Hour" : "On to your town's three"}</button>
        </main>
      )}

      {s.phase === 'dayEnd' && (
        <main class="panel poll">
          <h2 class="display">If the election were today</h2>
          <Gauge value={lastPoll ?? 50} />
          {prevPoll !== undefined && <p class={`trend ${(lastPoll ?? 0) >= prevPoll ? 'up' : 'down'}`}>{(lastPoll ?? 0) >= prevPoll ? '▲' : '▼'} {Math.abs((lastPoll ?? 0) - prevPoll)} since yesterday</p>}
          <ul class="objectives">{content.pack.objectives.map((o) => <li key={o.id} class={s.objectivesDone.includes(o.id) ? 'done' : ''}>{s.objectivesDone.includes(o.id) ? '✓' : '○'} {o.text}</li>)}</ul>
          <p class="cliff">{content.pack.cliffhangers[s.day - 1]}</p>
          <CopyButton text={shareDay} label="Share today" />
          {cal.today > s.day ? <button class="btn primary" onClick={() => jump(0)}>Start {DAY_NAMES[s.day] ?? 'the next day'}</button>
            : <><p class="hint">Come back tomorrow. Next day in {Math.floor(cal.msToMidnight / 3.6e6)}h {Math.floor((cal.msToMidnight % 3.6e6) / 6e4)}m.</p>
              <button class="btn primary" onClick={() => jump(1)}>Play the next day now <small>preview only</small></button></>}
        </main>
      )}

      {s.phase === 'results' && <Results s={s} onNewWeek={() => jump(8 - cal.today)} />}

      {/* overlays */}
      {focusCard && s.phase === 'desk' && (
        <Sheet label={`Request from ${NAMES[focusCard.who]}`} onClose={outcome || playing ? undefined : closeCard}>
          {outcome ? <ResultPanel r={outcome} onDone={closeCard} /> : playing ? <MiniGame key={playing.card.id + playing.option} card={playing.card} onDone={(sk) => choose(playing.card, playing.option, sk)} /> : (
            <CardSheet card={focusCard} s={s} mode="desk" urgent={focusSlot?.urgent} onClose={closeCard}
              onChoose={(i) => choose(focusCard, i)} onDave={legal.some((a) => a.type === 'delegate') ? () => delegate(focusCard) : undefined} />
          )}
        </Sheet>
      )}
      {outcome && !(focusCard && s.phase === 'desk') && <Sheet label="Result"><ResultPanel r={outcome} onDone={closeCard} /></Sheet>}
      {s.phase === 'event' && s.eventId && !outcome && !needSetup && (
        <Sheet label="Event" tone="event">
          <div class="ribbon event">TODAY'S EVENT · everyone gets this one</div>
          <CardSheet card={findCard(content, s.eventId)} s={s} mode="event" onChoose={(i) => choose(findCard(content, s.eventId!), i)} onSkip={() => { act({ type: 'skipEvent' }); sfx('paper'); }} />
        </Sheet>
      )}
      {s.phase === 'campaign' && !showIntro && !needSetup && !outcome && (
        <Sheet label="Campaign" tone="event">
          <div class="ribbon event">ELECTION DAY · one last move</div>
          <CardSheet card={campaignCard(s, content)} s={s} mode="campaign" onChoose={(i) => choose(campaignCard(s, content), i)} />
        </Sheet>
      )}
      {showIntro && (
        <Sheet label="This morning">
          <Bugle kicker={`${dayName} morning · ${s.profile?.town ?? ''}`} headline={s.daveDays.includes(s.day - 1) ? 'DEPUTY DAVE HANDS BACK TOWN, MOSTLY INTACT' : s.reports.length ? s.reports[s.reports.length - 1]!.headline : 'NEW MAYOR SWORN IN; TOWN BRACES'}>
            {s.daveDays.length > 0 && s.daveDays.includes(s.day - 1) && (
              <div class="speaker"><Portrait who="dave" size={60} mood="pleased" />
                <p class="bubble">You were out{s.reports.length === s.daveDays.length * 2 ? ' since Monday' : ''}, so we... I ran things for {s.daveDays.length} day{s.daveDays.length > 1 ? 's' : ''}. {content.pack.dave.absence[(s.day + s.daveDays.length) % content.pack.dave.absence.length]} It went fine. Don't check the bins.</p></div>
            )}
            {s.day === 1 && <p>You are the mayor. It is one week until the election. Everyone wants something, and there's only so much of you.</p>}
            {s.day === 7 && <p>It's election day. Whatever you did this week, the town remembers.</p>}
            <p class="hint">Poll this morning: <b>{voteShare(s, 0)}%</b> · you need 50% on Sunday.</p>
            <ul class="objectives">{content.pack.objectives.map((o) => <li key={o.id} class={s.objectivesDone.includes(o.id) ? 'done' : ''}>{s.objectivesDone.includes(o.id) ? '✓' : '○'} {o.text} <span class="chip vote">+2%</span></li>)}</ul>
          </Bugle>
          <button class="btn primary" autoFocus onClick={() => { persist(s, { introSeen: introKey }); sfx('paper'); }}>{s.day === 7 ? 'To the campaign' : 'To the desk'}</button>
        </Sheet>
      )}
      {needSetup && !enacted && <Setup late={s.daveDays.length > 0} onDone={(profile) => { act({ type: 'setup', profile }); sfx('win'); }} />}
      {overlay === 'names' && s.profile && <Names profile={s.profile} onClose={() => setOverlay(null)} onSave={(mayor, town) => { act({ type: 'rename', mayor, town }); setOverlay(null); }} />}
      {enacted && (
        <Sheet label="Decree enacted">
          <div class="result">
            <div class="stamp">IT'S THE LAW</div>
            <h2 class="display">{enacted.name}</h2>
            <div class="speaker"><Portrait who={enacted.who} size={72} mood={(enacted.effects && Object.values(enacted.effects).some((v) => v < 0)) ? 'annoyed' : 'pleased'} /><p class="bubble">{enacted.reaction}</p></div>
            <DecreeCosts d={enacted} />
            <button class="btn primary" autoFocus onClick={() => setEnacted(null)}>Carry on</button>
          </div>
        </Sheet>
      )}
      {lawBook && (
        <Sheet label="Law book" onClose={() => setLawBook(false)}>
          <h2 class="display">The law book</h2>
          {s.decrees.length === 0 && <p class="hint">Nothing enacted yet. Each morning you can make one thing the law.</p>}
          {s.decrees.map((id) => { const d = content.pack.decrees.find((x) => x.id === id)!; return <div key={id} class="law"><b>{d.name}</b><span>{d.text}</span><DecreeCosts d={d} ongoing /></div>; })}
        </Sheet>
      )}
      {overlay === 'tax' && (
        <Sheet label="Tax rate" onClose={() => setOverlay(null)}>
          <div class="speaker"><Portrait who="doug" size={60} /><p class="bubble">The tax rate. You can change it any time. Please be gentle. Or don't. I'm fine.</p></div>
          <div class="options">
            {(['low', 'medium', 'high'] as TaxLevel[]).map((level) => {
              const t = TUNING.tax[level];
              const inc = Math.round(t.mult * (TUNING.incomeBase + s.approval.business * TUNING.incomePerBusiness));
              return <button key={level} class={`option ${s.tax === level ? 'current' : ''}`} disabled={s.tax === level || !legal.some((a) => a.type === 'setTax')} onClick={() => { act({ type: 'setTax', level }); sfx('coin'); setOverlay(null); }}>
                <span class="opt-top"><b>{level[0]!.toUpperCase() + level.slice(1)} tax</b>{s.tax === level && <span class="why">current</span>}</span>
                <span class="costs"><MoneyChip value={inc} suffix="/mo" />{t.people !== 0 && <span class="chip monthly" style={{ '--g': GROUP_COLOR.people }}><i class="dot" />People {t.people > 0 ? '▲' : '▼'} each month</span>}</span>
              </button>;
            })}
          </div>
          <p class="hint">Each month every group also cools off a little: about {GROUPS.map((g) => `${GROUP_NAME[g]} −${fadeFor(s.approval[g])}`).join(', ')}. Popular mayors cool faster.</p>
        </Sheet>
      )}
      {overlay === 'recall' && (
        <Sheet label="Recalled" tone="recall">
          <div class="stamp denied big">RECALLED</div>
          <p class="bubble">{s.lastRecall ?? s.reports[s.reports.length - 1]?.recall ?? 'You have been recalled.'}</p>
          <p class="hint warn">You carry on as Acting Mayor. Every group resets to 40, money to $20k, and the election costs you 8 points. {s.recalls >= TUNING.recall.max ? 'One more recall ends the term.' : ''}</p>
          <button class="btn primary" onClick={() => { setOverlay(null); setFocus(null); setOutcome(null); }}>Carry on, somehow</button>
        </Sheet>
      )}
      {overlay === 'dev' && (
        <Sheet label="Dev panel" onClose={() => setOverlay(null)}>
          <h2 class="display">Dev panel</h2>
          <div class="options">
            <button class="option" onClick={() => jump(1)}><b>Jump to the next day</b><span class="costs"><span class="chip">Dave covers anything unfinished</span></span></button>
            <button class="option" onClick={reset}><b>Reset everything</b></button>
          </div>
          <pre class="share state">{JSON.stringify({ ...s, history: `${s.history.length} entries`, reports: `${s.reports.length} reports` }, null, 1)}</pre>
        </Sheet>
      )}
      <footer>Preview build · crowd numbers are simulated and labelled.</footer>
    </div>
  );
}
