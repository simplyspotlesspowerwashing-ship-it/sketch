import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { PACKS, SIMULATED_CROWD, packFor } from '../content/index.ts';
import { COMMON_ENDINGS, OUT_ORDER, RECALL_ORDER } from '../content/endings.ts';
import { voteParts } from '../engine/election.ts';
import { coverMissedDays, findCard, newTerm, reduce } from '../engine/engine.ts';
import { TUNING } from '../engine/tuning.ts';
import { MAX_CARD, cardPoints, dayScore, gradeOf, tierOf } from '../engine/score.ts';
import type { Crowd } from '../engine/score.ts';
import { GROUPS, METERS } from '../engine/types.ts';
import type { Card, Choice, Dir, GroupId, MeterId, Profile, State } from '../engine/types.ts';
import { GROUP_COLOR, GROUP_NAME, Icon, LEADER, NAMES, ODDBALLS, Portrait, Town } from './art.tsx';
import type { Mood, TownView } from './art.tsx';
import { DAY_NAMES, calendar, fetchCrowd, loadSave, sendVote, setMuted, sfx, writeSave } from './platform.ts';
import type { Save } from './platform.ts';

/** Preview crowd data: simulated until real players exist; always labelled as such. */
/** This week's pack and crowd shares. Set when the game boots for a week (see bootUnsafe). */
let pack = packFor(calendar(0).weekId);
/** Real shares (from the stats service) where enough mayors have played a card, simulated ones otherwise. */
let live: Crowd = {};
let crowd: Crowd = { ...SIMULATED_CROWD[pack.id] };
const useWeek = (weekId: string) => { const p = packFor(weekId); if (p !== pack) { pack = p; live = {}; } crowd = { ...SIMULATED_CROWD[pack.id], ...live }; };
/** True where the share shown for a card is still simulated. */
const isPreview = (cardId: string) => !live[cardId];
/** No stats service configured: this is a preview build, with testing shortcuts. */
/** Testing shortcuts (skip a day, dev panel): only in `npm run dev` or a build made with VITE_PREVIEW=1. */
const PREVIEW = import.meta.env.DEV || import.meta.env.VITE_PREVIEW === '1';
/** Card text can say {mayor} and {folk}; filled from the player's names. */
const who = { mayor: 'Mayor', folk: 'Bad Towners' };
const fill = (t: string) => t.replaceAll('{mayor}', who.mayor).replaceAll('{folk}', who.folk);
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const METER_NAME: Record<MeterId, string> = { ...GROUP_NAME, treasury: 'Treasury' };
const METER_COLOR: Record<MeterId, string> = { ...GROUP_COLOR, treasury: '#B58D55' };

function boot(save: Save): State {
  try { return bootUnsafe(save); } catch { return bootUnsafe({ ...save, state: null }); }
}
function bootUnsafe(save: Save): State {
  const cal = calendar(save.dayOffset);
  useWeek(cal.weekId);
  const kept = save.state && save.state.v === 11 && save.state.weekId === cal.weekId && save.state.day <= cal.today ? save.state : null;
  return coverMissedDays(kept ?? newTerm(cal.weekId, save.playerSeed, pack), pack, cal.today);
}


// ---------- meters ----------
function MeterIcon({ m }: { m: MeterId }) {
  return m === 'treasury' ? <span class="coinface"><Icon.coin size={30} /></span> : <Portrait who={LEADER[m as GroupId]!} size={34} ring={GROUP_COLOR[m as GroupId]} mood="neutral" />;
}

function Meters({ s, preview }: { s: State; preview: Choice | null }) {
  return (
    <div class="meters" role="group" aria-label="Your standing">
      {METERS.map((m) => {
        const v = s.meters[m];
        const danger = v <= TUNING.low || (m !== 'treasury' && v >= TUNING.high);
        const hint = preview?.effects[m];
        return (
          <div key={m} class={`meter ${danger ? 'danger' : ''}`} style={{ '--g': METER_COLOR[m] }} role="meter" aria-label={`${METER_NAME[m]} ${v} of 100`} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
            <MeterIcon m={m} />
            <span class="hbar small"><i class="now" style={{ width: `${v}%` }} /><CalmZone m={m} /></span>
            {hint ? <i class={`hintdot ${Math.abs(hint) >= 10 ? 'big' : ''}`} aria-label="will change" /> : null}
          </div>
        );
      })}
    </div>
  );
}

/** The big reveal after a swipe: a short staged scene. The choice is stamped, the character reacts,
 *  then each group that moved acts it out (cheering, storming, coins) while its number counts and its
 *  bar slides, and finally the crowd: how many mayors did the same, and what that's worth. */
interface RevealData { key: number; card: Card; dir: Dir; before: Record<MeterId, number>; after: Record<MeterId, number>; pct: number | undefined; recalled: boolean; goals?: string[] }

function CountUp({ to, ms = 650, bare }: { to: number; ms?: number; bare?: boolean }) {
  const [v, setV] = useState(reduced() ? to : 0);
  useEffect(() => {
    if (reduced()) return;
    let raf = 0; const t0 = performance.now();
    const f = (now: number) => { const p = Math.min(1, (now - t0) / ms); setV(Math.round(to * (1 - (1 - p) ** 3))); if (p < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <>{bare ? '' : v > 0 ? '+' : v < 0 ? '−' : ''}{Math.abs(v)}</>;
}

/** The band where a meter earns full points (45–55; the treasury: 45 and up). */
const CalmZone = ({ m }: { m: MeterId }) => { const c = TUNING.score.calm; return <i class="calm" aria-hidden="true" style={{ left: `${50 - c}%`, width: m === 'treasury' ? `${50 + c}%` : `${2 * c}%` }} />; };

function SlideBar({ m, from, to }: { m: MeterId; from: number; to: number }) {
  const [w, setW] = useState(reduced() ? to : from);
  useEffect(() => { const t = setTimeout(() => setW(to), 120); return () => clearTimeout(t); }, [to]);
  return (
    <span class="rv-bar">
      <i class="zone low" style={{ width: `${TUNING.low}%` }} />
      {m !== 'treasury' && <i class="zone high" style={{ width: `${100 - TUNING.high}%` }} />}
      <i class="fill" style={{ width: `${w}%` }} />
      <CalmZone m={m} />
      <i class="ghost" style={{ left: `${from}%` }} />
    </span>
  );
}


/** After a choice the card turns over: the character's face and what they said, the bars that moved and
 *  what other mayors did. */
function ImpactReveal({ r, onDone }: { r: RevealData; onDone: () => void }) {
  const ch = r.card.options[r.dir]!;
  const ms = METERS.filter((m) => r.after[m] !== r.before[m]).sort((a, b) => Math.abs(r.after[b] - r.before[b]) - Math.abs(r.after[a] - r.before[a]));
  const pts = cardPoints(r.after);
  const grade = gradeOf(pts);
  const net = ms.reduce((n, m) => n + r.after[m] - r.before[m], 0);
  const [bars, setBars] = useState(reduced());
  useEffect(() => { const t = setTimeout(() => { setBars(true); sfx(ms.length === 0 ? 'tap' : net >= 0 ? 'win' : 'warn'); }, 380); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); onDone(); } };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, []);
  // whoever asked is pleased by a yes and put out by a no
  const mood: Mood = r.dir === 'right' ? 'pleased' : 'annoyed';
  return (
    <div class="stage">
      <div class={`card result ${mood} ${r.recalled ? 'recalled' : ''}`} style={{ '--g': mood === 'pleased' ? '#3F8F5A' : mood === 'annoyed' ? '#C23B3B' : '#8C8577' }}>
        <p class={`result-choice ${r.dir === 'left' ? 'no' : 'yes'}`}><b>{r.dir === 'left' ? '✗' : '✓'}</b> {fill(ch.label)}</p>
        <div class={`result-face ${mood}`}><Portrait who={r.card.who} size={150} mood={mood} /></div>
        <p class="result-quote"><b>{NAMES[r.card.who]?.split(',')[0] ?? r.card.who}</b>“{fill(ch.reaction)}”{ch.then?.length ? <em> This isn't over.</em> : ch.next?.length ? <em> You'll hear about this tomorrow.</em> : null}</p>
        <div class="rv-bars">
          {ms.length === 0 && <span class="rv-barrow none in">Nothing changed. Nobody even looked up.</span>}
          {ms.map((m, i) => {
            const d = r.after[m] - r.before[m], up = d > 0;
            const edge = r.after[m] <= TUNING.low || (m !== 'treasury' && r.after[m] >= TUNING.high);
            return (
              <span key={m} class={`rv-barrow ${up ? 'up' : 'down'} ${bars ? 'in' : ''}`} style={{ '--g': METER_COLOR[m], '--d': `${i * 110}ms` }}>
                <MeterIcon m={m} />
                <span class="rv-barname">{METER_NAME[m]}{edge && bars ? <em>{r.after[m] <= TUNING.low ? ' · danger' : ' · too high'}</em> : null}</span>
                <span class="rv-barnum">{up ? '▲' : '▼'}{bars ? <CountUp to={Math.abs(d)} bare /> : Math.abs(d)}</span>
                <SlideBar m={m} from={r.before[m]} to={bars ? r.after[m] : r.before[m]} />
              </span>
            );
          })}
        </div>
        <div class={`result-score g-${grade.id}`}>
          {r.recalled ? <b class="rv-recalled">RECALLED</b> : <><span class="pts">+{pts}<small>/{MAX_CARD}</small></span><span class="grade">{grade.name}</span><span class="why">{pts >= 9 ? 'Everyone is calm.' : pts >= 7 ? 'Mostly calm.' : pts >= 5 ? 'Somebody is getting twitchy.' : 'The town is on edge.'}</span></>}
        </div>
        {r.goals?.map((g) => <p key={g} class="goal-met"><b>★ Goal met</b> {g} <small>+{TUNING.vote.objective}% at every election this week</small></p>)}
        {r.pct !== undefined && !r.recalled && <p class="result-crowd"><b>{r.pct}%</b> of mayors did the same{isPreview(r.card.id) && <span class="tag">estimate</span>}</p>}
      </div>
      <div class="choices n1">
        <button class="edge-chip right next" autoFocus onClick={onDone}><b>→</b><span>{r.recalled ? 'Oh no' : 'Next'}</span></button>
      </div>
    </div>
  );
}

/** One tense moment a day: hold to wind up, let go while they're not looking. */
function SneakCard({ card, onResult, meet }: { card: Card; onResult: (d: Dir) => void; meet?: boolean }) {
  const st = useRef({ t: 0, looking: false, warn: false, next: 1.4, charge: 0, holding: false, heldFull: 0, done: false, idle: 0 });
  const [, setF] = useState(0);
  const finish = (d: Dir) => { const s = st.current; if (s.done) return; s.done = true; sfx(d === 'right' ? 'stamp' : 'lose'); setTimeout(() => onResult(d), 600); };
  const release = () => { const s = st.current; if (!s.holding || s.done) return; s.holding = false; if (s.charge < 0.6) return; finish(s.looking ? 'left' : 'right'); };
  const press = () => { const s = st.current; if (s.done) return; s.holding = true; s.heldFull = 0; s.idle = 0; sfx('tap'); };
  useEffect(() => {
    let raf = 0, last = performance.now();
    const tick = (now: number) => {
      const s = st.current, dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (s.done) { setF((f) => f + 1); return; }
      s.t += dt;
      if (s.t >= s.next) { s.looking = !s.looking; s.warn = false; s.next = s.t + (s.looking ? 0.6 + Math.random() * 0.9 : 0.9 + Math.random() * 1.6); }
      if (!s.looking && s.next - s.t < 0.3) s.warn = true;
      if (s.holding) { s.charge = Math.min(1, s.charge + dt / 0.8); if (s.charge >= 1) { s.heldFull += dt; if (s.heldFull > 0.7) { s.holding = true; release(); } } }
      else { s.charge = Math.max(0, s.charge - dt * 2); s.idle += dt; if (s.idle > 9) finish('left'); }
      setF((f) => f + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key !== ' ') return; e.preventDefault(); if (e.type === 'keydown' && !e.repeat) press(); if (e.type === 'keyup') release(); }; addEventListener('keydown', k); addEventListener('keyup', k); return () => { removeEventListener('keydown', k); removeEventListener('keyup', k); }; }, []);
  const s = st.current;
  const res = s.done ? (s.looking ? 'CAUGHT' : 'GOT AWAY WITH IT') : null;
  return (
    <div class="stage">
      <div class={`card sneak ${s.looking ? 'looking' : s.warn ? 'warn' : 'away'} ${s.done ? 'over' : ''}`}>
        <span class="sneak-tag">{res ?? (s.looking ? 'WATCHING YOU' : s.warn ? 'TURNING…' : 'NOT LOOKING')}</span>
        <div class="card-who"><span class="sneak-face"><Portrait who={card.who} size={110} mood={s.looking ? 'annoyed' : 'neutral'} /></span><span>{NAMES[card.who] ?? card.who}</span></div>
        {meet && <Meet />}
        <p class="card-text">{fill(card.text)}</p>
        <span class="sneak-charge"><i style={{ width: `${s.charge * 100}%` }} /></span>
      </div>
      <button class={`btn mg-big sneak-btn ${s.holding ? 'go' : ''}`} onPointerDown={press} onPointerUp={release} onPointerLeave={release}>{s.holding ? (s.charge >= 1 ? 'NOW! Let go!' : 'Winding up…') : 'Hold, then let go'}</button>
      <p class="hint">Hold to wind up, release while they're not looking. Hold too long and your arm gives out.</p>
    </div>
  );
}

// ---------- the swipe card ----------
/** First time a character turns up: who they are, once. */
const Meet = () => <span class="meet">New face</span>;

const THRESH = 90;
/** Every card is a yes or a no: right approves, left rejects. */
function dirOf(x: number, _y: number): Dir { return x > 0 ? 'right' : 'left'; }

function SwipeCard({ card, onPreview, onSwipe, locked, meet }: { card: Card; onPreview: (d: Dir | null) => void; onSwipe: (d: Dir) => void; locked: boolean; meet?: boolean }) {
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [leaving, setLeaving] = useState<Dir | null>(null);
  const [stamped, setStamped] = useState<Dir | null>(null);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
    const cur = drag && Math.abs(drag.x) > 24 ? dirOf(drag.x, drag.y) : null;
  const valid = cur && card.options[cur] ? cur : null;
  useEffect(() => { onPreview(valid); }, [valid]);
  const commit = (d: Dir) => {
    if (locked || leaving || stamped || !card.options[d]) return;
    // stamped as done first, then the card leaves
    setStamped(d); setDrag(null); onPreview(null);
    if (reduced()) { onSwipe(d); return; }
    setTimeout(() => sfx('stamp'), 300);
    setTimeout(() => { setLeaving(d); sfx('paper'); }, 1050);
    setTimeout(() => onSwipe(d), 1300);
  };
  useEffect(() => {
    const k = (e: KeyboardEvent) => { const m: Record<string, Dir> = { ArrowLeft: 'left', ArrowRight: 'right', n: 'left', y: 'right' }; const d = m[e.key]; if (d && card.options[d]) { e.preventDefault(); commit(d); } };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  });
  const fly = leaving ? { left: [-700, 60, -30], right: [700, 60, 30], up: [0, -700, 0], down: [0, 700, 0] }[leaving] : null;
  const style = fly ? { transform: `translate(${fly[0]}px, ${fly[1]}px) rotate(${fly[2]}deg)`, transition: 'transform .26s ease-in', opacity: 0.6 }
    : drag ? { transform: `translate(${drag.x}px, ${drag.y * 0.8}px) rotate(${drag.x / 14}deg)`, transition: 'none' } : {};
  return (
    <div class="stage">
      <div class={`card ${stamped ? 'is-stamped' : ''}`} style={style}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={(e) => { if (locked || leaving || stamped) return; e.preventDefault(); getSelection()?.removeAllRanges(); (e.currentTarget as Element).setPointerCapture(e.pointerId); start.current = { x: e.clientX, y: e.clientY, id: e.pointerId }; setDrag({ x: 0, y: 0 }); }}
        onPointerMove={(e) => { if (start.current) setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y }); }}
        onPointerUp={() => { const d = drag; start.current = null; setDrag(null); if (d && Math.abs(d.x) > THRESH) { const dir = dirOf(d.x, d.y); if (card.options[dir]) { commit(dir); return; } } onPreview(null); }}
        onPointerCancel={() => { start.current = null; setDrag(null); onPreview(null); }}>
        <div class="card-who"><Portrait who={card.who} size={110} mood={valid ? 'annoyed' : 'neutral'} /><span>{NAMES[card.who] ?? card.who}</span></div>
        {meet && <Meet />}
        <p class="card-text">{fill(card.text)}</p>
        {valid && !stamped && <div class={`choice-banner ${valid}`}>{fill(card.options[valid]!.label)}</div>}
        {stamped && (
          <div class="done-stamp">
            <span>{fill(card.options[stamped]!.label)}</span>
            <b class={stamped === 'left' ? 'no' : 'yes'}>{stamped === 'left' ? 'REJECTED' : 'APPROVED'}</b>
            <svg class="stamper" viewBox="0 0 120 150" aria-hidden="true">
              <ellipse cx="60" cy="22" rx="26" ry="18" fill="#8A5A3C" stroke="#29231F" stroke-width="5" />
              <rect x="48" y="34" width="24" height="54" rx="6" fill="#B58D55" stroke="#29231F" stroke-width="5" />
              <rect x="14" y="86" width="92" height="30" rx="8" fill="#6B4B32" stroke="#29231F" stroke-width="5" />
              <rect x="8" y="114" width="104" height="16" rx="4" fill={stamped === 'left' ? '#C23B3B' : '#2C6B41'} stroke="#29231F" stroke-width="5" />
            </svg>
          </div>
        )}
        <p class="card-hint">← no · yes →</p>
      </div>
      <div class="choices n2">
        {(['left', 'right'] as Dir[]).filter((d) => card.options[d]).map((d) => <button key={d} class={`edge-chip ${d} ${d === 'left' ? 'no' : 'yes'} ${valid === d ? 'on' : ''}`} onClick={() => commit(d)} aria-label={`${d === 'left' ? 'No' : 'Yes'}: ${fill(card.options[d]!.label)}`}><b>{d === 'left' ? '✗' : '✓'}</b><span>{fill(card.options[d]!.label)}</span></button>)}
      </div>
    </div>
  );
}

// ---------- overlays ----------
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

/** This week's goals (shown up front, like a to-do list). Each one met adds to every night's vote. */
function Goals({ s }: { s: State }) {
  return (
    <div class="goals"><b class="goals-head">This week's goals <small>+{TUNING.vote.objective}% every night</small></b>
      <ul>{pack.objectives.map((o) => { const done = s.objectivesDone.includes(o.id); return <li key={o.id} class={done ? 'done' : ''}><span aria-hidden="true">{done ? '★' : '☐'}</span>{o.text}{done && <span class="sr-only"> (done)</span>}</li>; })}</ul>
    </div>
  );
}

/** Night falls: the vote, the score that drove it, the streak, and a hook for tomorrow. */
function DayReview({ s, streak, fresh, onNext, nextLabel, wait, sub }: { s: State; streak: number; fresh: string[]; onNext: () => void; nextLabel: string; wait?: string | null; sub?: preact.ComponentChildren }) {
  const sc = dayScore(s, s.day);
  const tier = tierOf(sc.total);
  const today = s.swipes.filter((w) => w.day === s.day);
  const end = today[today.length - 1]?.after ?? s.meters;
  const rows = METERS.map((m) => `${METER_NAME[m]}: ${end[m]}`);
  const vote = s.polls[s.day - 1] ?? 0;
  const won = !!s.won[s.day - 1];
  const early = s.recalledDays.includes(s.day);
  const randy = s.daveDays.includes(s.day);
  const twist = early && !!s.endings[s.endings.length - 1]?.startsWith('rare:');
  const verdict = won ? 'RE-ELECTED' : twist ? 'PLOT TWIST' : early ? 'RECALLED' : 'VOTED OUT';
  const parts = voteParts(s, s.day);
  const out = !won && !early ? s.endings[s.endings.length - 1] : undefined;
  const share = `Mayor of Bad Town · ${DAY_NAMES[s.day - 1]} · ${verdict} ${vote}%${won && streak > 1 ? ` · 🔥 ${streak}` : ''}\n${sc.total} pts · ${tier.name}\n${rows.join('\n')}`;
  const [copied, setCopied] = useState(false);
  useEffect(() => { sfx(won ? 'win' : 'lose'); }, []);
  return (
    <div class="review dayend">
      <div class="bugle"><div class="masthead"><span>THE BUGLE</span><small>{DAY_NAMES[s.day - 1]} night</small></div>
        <div class="poll-row"><span class="bigpoll">{vote}%</span><span><b class={`verdict-tag ${won ? 'won' : 'lost'}`}>{verdict}</b><small>{twist ? 'The story went somewhere you couldn\'t come back from. Not tonight, anyway.' : early ? 'You were gone before the polls even opened.' : randy ? 'Randy counted the votes himself. He says you won.' : `${Math.round(parts.day)}% from today's score${parts.goals ? `, +${parts.goals}% for goals met` : ''}. You need ${TUNING.vote.pass}%.`}</small></span></div>
        <p class="streakline">{won ? (streak > 0 ? `🔥 Re-elected ${streak} night${streak > 1 ? 's' : ''} in a row` : 'Re-elected.') : "Streak over. You'll run again tomorrow. Everything restarts at " + TUNING.recall.reset + '.'}</p>
      </div>
      {out && <EndingCard k={out} isNew={fresh.includes(out)} />}
      <div class="dayscore">
        <span class="bigscore">{sc.total}<small>pts</small></span>
        <span><b class="tiername">{tier.name}</b><small>{sc.balance} for keeping the town balanced{sc.bonus ? `, +${sc.bonus} for a steady finish` : ''}{sc.recalled ? `, −${TUNING.score.recall} for ending early` : ''}</small></span>
      </div>
      <ul class="levels" aria-label="Where everyone ended the day">{rows.map((r) => <li key={r}>{r}</li>)}</ul>
      <Goals s={s} />
      {s.tomorrow.length > 0 && <p class="carry"><b>Waiting for you tomorrow:</b> {[...new Set(s.tomorrow.map((id) => pack.headlines[findCard(pack, id).story ?? 'town'] ?? 'Unfinished business'))].join(' · ')}</p>}
      {sub}
      <div class="dayend-btns">
        <button class="btn" onClick={() => { try { void navigator.clipboard.writeText(share); setCopied(true); } catch { /* clipboard blocked */ } sfx('tap'); }}>{copied ? 'Copied' : 'Copy result'}</button>
        {wait ? <button class="btn primary" disabled>{wait}</button> : <button class="btn primary" onClick={onNext} autoFocus>{nextLabel}</button>}
      </div>
      {wait && PREVIEW && <button class="linkbtn" onClick={onNext}>Testing: skip to the next day</button>}
    </div>
  );
}

// ---------- scrapbook ----------
/** Every rare ending across all weeks, in week order. */
const RARE_ORDER = PACKS.flatMap((p) => Object.keys(p.endings).filter((k) => k.startsWith('rare:')).map((k) => [k, p.theme.name] as const));
const endingText = (k: string) => pack.endings[k] ?? COMMON_ENDINGS[k] ?? PACKS.find((p) => p.endings[k])?.endings[k] ?? { title: 'An ending', text: '' };
const mine = (s: State, i: number) => !s.daveDays.includes(i + 1);
interface Deed { id: string; name: string; how: string; test: (s: State, save: Save) => boolean }
const DEEDS: Deed[] = [
  { id: 'firstWin', name: 'Re-elected', how: 'Win a night\'s vote', test: (s) => s.won.some((w, i) => w && mine(s, i)) },
  { id: 'landslide', name: 'Landslide', how: 'Win a night with 70% or more', test: (s) => s.polls.some((v, i) => s.won[i] && v >= 70 && mine(s, i)) },
  { id: 'whisker', name: 'By a Whisker', how: 'Win a night with exactly 50%', test: (s) => s.polls.some((v, i) => s.won[i] && v === TUNING.vote.pass && mine(s, i)) },
  { id: 'comeback', name: 'Comeback Kid', how: 'Win the night after losing one', test: (s) => s.won.some((w, i) => i > 0 && w && !s.won[i - 1] && mine(s, i) && mine(s, i - 1)) },
  { id: 'streak7', name: 'Seven in a Row', how: 'Get re-elected seven nights running', test: (_s, save) => save.streak.best >= 7 },
  { id: 'unsinkable', name: 'Unsinkable', how: 'Win all seven nights of a week', test: (s) => !!s.result && s.won.length === 7 && s.won.every(Boolean) },
  { id: 'twist', name: 'Plot Twist', how: 'Find a rare ending', test: (_s, save) => save.scrapbook.some((k) => k.startsWith('rare:')) },
  { id: 'pond', name: 'Pond Life', how: 'Open the pond in your office', test: (s) => !!s.flags['built:pond'] },
  { id: 'cone', name: 'Fair Play', how: 'Give the stolen cone back', test: (s) => !!s.flags.cone_back },
  { id: 'cheese', name: 'Treasurer Cheese', how: 'Give the cheese Doug\'s job', test: (s) => !!s.flags.cheese_job },
  { id: 'kevin', name: 'Kevin Forever', how: 'Keep Kevin unfilled', test: (s) => !!s.flags.kevin_saved },
  { id: 'bev', name: 'Grand Prix', how: 'Send Bev to Formula One', test: (s) => !!s.flags.bev_f1 },
  { id: 'reginald', name: 'Slow and Steady', how: 'Give Reginald his road', test: (s) => !!s.flags.reg_road },
  { id: 'gary', name: 'Good Sport', how: 'Help Gary up when he falls', test: (s) => !!s.flags.gary_help },
  { id: 'collector', name: 'Collector', how: 'Collect ten endings', test: (_s, save) => save.scrapbook.length >= 10 },
];
/** Bring the Scrapbook, the career and the streak up to date with this week's state. Safe to call on every change. */
function record(save: Save, s: State): { save: Save; endings: string[]; deeds: string[] } {
  const endings = [...new Set(s.endings)].filter((k) => !save.scrapbook.includes(k));
  let next: Save = endings.length ? { ...save, scrapbook: [...save.scrapbook, ...endings] } : save;
  const [wk, n] = next.counted.split('|');
  const done = wk === s.weekId ? Number(n) || 0 : 0;
  if (s.won.length > done) {
    let { current, best } = next.streak;
    let { wins, best: bestVote, nights } = next.career;
    for (let i = done; i < s.won.length; i++) {
      if (!mine(s, i)) continue; // Randy's nights pause the streak
      nights += 1;
      if (s.won[i]) { current += 1; wins += 1; bestVote = Math.max(bestVote, s.polls[i] ?? 0); } else current = 0;
      best = Math.max(best, current);
    }
    next = { ...next, streak: { current, best }, counted: `${s.weekId}|${s.won.length}`, career: { ...next.career, wins, best: bestVote, nights } };
  }
  if (s.result && !next.career.weeks.includes(s.weekId)) next = { ...next, career: { ...next.career, terms: next.career.terms + 1, weeks: [...next.career.weeks, s.weekId] } };
  const deeds = DEEDS.filter((d) => !next.deeds.includes(d.id) && d.test(s, next)).map((d) => d.id);
  if (deeds.length) next = { ...next, deeds: [...next.deeds, ...deeds] };
  return { save: next, endings, deeds };
}
function EndingCard({ k, isNew }: { k: string; isNew?: boolean }) {
  const e = endingText(k);
  return <div class={`ending ${k.split(':')[0]}`}>{isNew && <span class="newtag">NEW IN YOUR SCRAPBOOK</span>}<b>{e.title}</b><span>{e.text}</span></div>;
}
const Locked = ({ hint }: { hint: string }) => <div class="ending locked"><b>???</b><span>{hint}</span></div>;
function Scrapbook({ save, onClose, onRename }: { save: Save; onClose: () => void; onRename?: () => void }) {
  const c = save.career;
  const have = (k: string) => save.scrapbook.includes(k);
  const count = (ks: readonly string[]) => ks.filter(have).length;
  return (
    <Sheet label="Scrapbook" onClose={onClose}>
      <h2 class="display">The Mayor's Scrapbook</h2>
      {onRename && <p class="book-who">{who.mayor}, mayor of the {who.folk} <button class="linkbtn" onClick={onRename}>Rename</button></p>}
      <div class="career"><span><b>{c.wins}</b>nights re-elected</span><span><b>🔥 {save.streak.current}</b>streak now</span><span><b>{save.streak.best}</b>best streak</span><span><b>{c.terms}</b>weeks served</span></div>
      <h3 class="subhead">Rare endings <small>{count(RARE_ORDER.map(([k]) => k))} of {RARE_ORDER.length}</small></h3>
      <div class="endings">{RARE_ORDER.map(([k, week]) => have(k) ? <EndingCard key={k} k={k} /> : <Locked key={k} hint={`${week}: follow the long story all the way`} />)}</div>
      <h3 class="subhead">Voted out <small>{count(OUT_ORDER)} of {OUT_ORDER.length}</small></h3>
      <div class="endings">{OUT_ORDER.map((k) => have(k) ? <EndingCard key={k} k={k} /> : <Locked key={k} hint={`Lose a night with ${METER_NAME[k.split(':')[1] as MeterId]} unhappiest`} />)}</div>
      <h3 class="subhead">Recalled <small>{count(RECALL_ORDER)} of {RECALL_ORDER.length}</small></h3>
      <div class="endings">{RECALL_ORDER.map((k) => have(k) ? <EndingCard key={k} k={k} /> : <Locked key={k} hint={k === 'low:treasury' ? 'Run out of money' : `${k.startsWith('low') ? 'Lose' : 'Be far too loved by'} ${METER_NAME[k.split(':')[1] as MeterId]}`} />)}</div>
      <h3 class="subhead">Oddballs met <small>{ODDBALLS.filter((w) => save.met.includes(w)).length} of {ODDBALLS.length}</small></h3>
      <div class="cast">{ODDBALLS.map((w) => save.met.includes(w) ? <span key={w} class="cast-member"><Portrait who={w} size={56} mood="pleased" /><small>{(NAMES[w] ?? w).split(/[,(]/)[0]!.trim()}</small></span> : <span key={w} class="cast-member locked"><span class="cast-q">?</span><small>???</small></span>)}</div>
      <h3 class="subhead">Deeds <small>{save.deeds.length} of {DEEDS.length}</small></h3>
      <ul class="deeds">{DEEDS.map((d) => <li key={d.id} class={save.deeds.includes(d.id) ? 'done' : ''}><span class="seal">{save.deeds.includes(d.id) ? '★' : '·'}</span><b>{d.name}</b><small>{d.how}</small></li>)}</ul>
    </Sheet>
  );
}

// ---------- setup ----------
// ---------- names ----------
const pickOne = (xs: string[], not?: string) => { const pool = xs.filter((x) => x !== not); return pool[Math.floor(Math.random() * pool.length)]!; };
const FOLKS = ['Bad Towners', 'Baddies', 'the Damp', 'Townspeople, Unfortunately', 'the Mildly Concerned', 'Goose Neighbours', 'the Regulars', 'Bad Townies', 'the Lot of Them', 'Residents (Allegedly)'];
const MAYORS = ['Mayor Biscuit', 'Mayor Pat', 'Mayor Wobble', 'Mayor Jo', 'Mayor Crumb', 'Mayor Sam', 'Mayor Pickle', 'Mayor Noodle', 'Mayor Trousers', 'Mayor Big Steve'];

/** Mayor name, what the townsfolk are called and (once a term) who voted for you. The town is always Bad Town. */
function NameFields({ mayor, setMayor, folk, setFolk }: { mayor: string; setMayor: (v: string) => void; folk: string; setFolk: (v: string) => void }) {
  const rows: [string, string, string, (v: string) => void, string[]][] = [['mayor-name', 'Your name', mayor, setMayor, MAYORS], ['folk-name', 'What are the townsfolk called?', folk, setFolk, FOLKS]];
  return <>{rows.map(([id, label, value, set, list]) => (
    <label key={id} class="field" for={id}><span>{label}</span>
      <span class="field-row"><input id={id} value={value} maxLength={18} onInput={(e) => set((e.target as HTMLInputElement).value)} />
        <button type="button" class="icon" aria-label={`Random ${label.toLowerCase()}`} onClick={() => set(pickOne(list, value))}><Icon.dice /></button></span></label>
  ))}</>;
}
function BasePick({ base, setBase }: { base: GroupId; setBase: (g: GroupId) => void }) {
  return (
    <fieldset class="pick"><legend>Who actually voted for you? (they start a little happier)</legend>
      <div class="pick-grid">{GROUPS.map((g) => <button type="button" key={g} class={`pick-btn ${base === g ? 'on' : ''}`} aria-pressed={base === g} style={{ '--g': GROUP_COLOR[g] }} onClick={() => setBase(g)}><Portrait who={LEADER[g]!} size={36} ring={GROUP_COLOR[g]} mood={base === g ? 'pleased' : 'neutral'} /><b>{GROUP_NAME[g]}</b></button>)}</div></fieldset>
  );
}
function Setup({ onDone, initial, title, rename }: { onDone: (p: Profile) => void; initial?: Profile | null; title: string; rename?: boolean }) {
  const [mayor, setMayor] = useState(initial?.mayor ?? pickOne(MAYORS));
  const [folk, setFolk] = useState(initial?.folk ?? pickOne(FOLKS));
  const [base, setBase] = useState<GroupId>(initial?.base ?? 'people');
  return (
    <Sheet label={title}>
      <h2 class="display">{title}</h2>
      <NameFields mayor={mayor} setMayor={setMayor} folk={folk} setFolk={setFolk} />
      {!rename && <BasePick base={base} setBase={setBase} />}
      <button class="btn primary" onClick={() => onDone({ mayor, folk, base })}>{rename ? 'Save' : 'Take the oath again'}</button>
    </Sheet>
  );
}

// ---------- the opening: first visit only ----------
const OPENING_TOWN: TownView = { day: 2, approval: { people: 50, business: 50, law: 50, press: 50 }, flags: {}, fresh: null };
function Opening({ onDone }: { onDone: (p: Profile) => void }) {
  const [i, setI] = useState(0);
  const [mayor, setMayor] = useState(pickOne(MAYORS));
  const [folk, setFolk] = useState(pickOne(FOLKS));
  const [base, setBase] = useState<GroupId>('people');
  const [oath, setOath] = useState(false);
  const next = () => { setI(i + 1); sfx('paper'); };
  const slides: preact.ComponentChildren[] = [
    <div class="op-slide" key="0">
      <div class="op-town"><Town s={OPENING_TOWN} scene="goose" /></div>
      <h2 class="op-title">This is Bad Town.</h2>
      <p>Population: 4,112 people, 61 geese and one raccoon who won't give the keys back.</p>
      <p class="op-motto">Town motto: <i>“Well, We Tried.”</i></p>
    </div>,
    <div class="op-slide" key="1">
      <div class="op-who bounce"><Portrait who="randy" size={150} mood="pleased" /></div>
      <h2 class="op-title">Until last week, the mayor was Randy.</h2>
      <p>Randy is a raccoon. He was mayor for eleven years. Nobody remembers voting for him. Last week he stepped down “to spend more time with his bins”.</p>
      <p class="op-quote">“I'm not going anywhere, boss. I'm staying on as your deputy. To help. Mostly to help.” <b>— Deputy Randy</b></p>
    </div>,
    <div class="op-slide" key="2">
      <div class="op-ballot"><span class="op-votes"><b>{mayor || 'You'}</b><i style={{ '--w': '100%' }} /><em>1 vote</em></span><span class="op-votes randy"><b>A traffic cone</b><i style={{ '--w': '0%' }} /><em>0 votes*</em></span></div>
      <h2 class="op-title">So you ran. Against a traffic cone. You won by one vote.</h2>
      <p>*The cone has not conceded. There's an election every night, and something always runs against you. Polls say it's close. They always do.</p>
      <p>Randy has promised to help. Nobody asked him to. He has a lot of ideas. Most of them are bins.</p>
    </div>,
    <div class="op-slide" key="3">
      <div class="op-cast">{GROUPS.map((g, k) => <span key={g} class="op-castmember" style={{ '--g': GROUP_COLOR[g], 'animation-delay': `${k * 120}ms` }}><Portrait who={LEADER[g]!} size={64} ring={GROUP_COLOR[g]} mood="neutral" /><b>{GROUP_NAME[g]}</b><small>{NAMES[LEADER[g]!]?.split(',')[0]}</small></span>)}<span class="op-castmember" style={{ '--g': '#B58D55', 'animation-delay': '480ms' }}><Portrait who="doug" size={64} ring="#B58D55" mood="annoyed" /><b>Treasury</b><small>Doug</small></span></div>
      <h2 class="op-title">Five things can get you thrown out.</h2>
      <p>The People, Business, the Law and the Press all want something from you, every hour, forever. Let any of them get <b>too unhappy</b> and they recall you. Let any of them get <b>too happy</b> and they take over, which is worse. Run out of <b>money</b> and Doug cries, then recalls you.</p>
    </div>,
    <div class="op-slide" key="4">
      <div class="op-demo"><span class="op-card"><Portrait who="gerald" size={70} mood="annoyed" /><small>The geese would like a pond. In your office.</small></span><span class="op-hand">👆</span></div>
      <h2 class="op-title">20 problems a day. Yes or no.</h2>
      <p>Drag the card right to approve, left to reject (or tap the buttons). You won't see what it does until you've decided. Then you'll definitely see it.</p>
      <p>You score points after every card for keeping every group calm: inside the striped box on each bar. Let anyone get too angry or too happy and the points dry up. Every mayor gets the same problems, so you'll see how many made the same call.</p>
      <p><b>Every night is an election.</b> Keep everyone calm and you'll get your 50%. Lose, and you're back the next morning with a story for the Scrapbook.</p>
      <p>Each week has a theme, three goals (the ★ at the top) and one long story. Follow it far enough and things get strange.</p>
    </div>,
    <div class="op-slide" key="5">
      <h2 class="op-title">Sign here, please.</h2>
      <NameFields mayor={mayor} setMayor={setMayor} folk={folk} setFolk={setFolk} />
      <BasePick base={base} setBase={setBase} />
      <label class="op-oath"><input type="checkbox" checked={oath} onChange={(e) => setOath((e.target as HTMLInputElement).checked)} /> I solemnly swear to do my best, or at least something.</label>
    </div>,
  ];
  const last = i === slides.length - 1;
  return (
    <div class="scrim opening" role="dialog" aria-modal="true" aria-label="Welcome to Bad Town">
      <div class="sheet op">
        {slides[i]}
        <div class="op-nav">
          <span class="op-dots">{slides.map((_, k) => <i key={k} class={k === i ? 'on' : k < i ? 'done' : ''} />)}</span>
          {last ? <button class="btn primary" disabled={!oath} onClick={() => { sfx('win'); onDone({ mayor, folk, base }); }}>{oath ? 'Take office' : 'Tick the oath first'}</button>
            : <button class="btn primary" autoFocus onClick={next}>{['Go on', 'Oh no', 'Right…', 'Got it', 'Let me at it'][i]}</button>}
        </div>
      </div>
    </div>
  );
}

// ---------- the week in review (after Sunday night) ----------
/** A nickname for the week, from what you actually did. */
function nickname(s: State): string {
  const nights = s.won.filter(Boolean).length;
  if (s.won.length === 7 && nights === 7) return 'the Unsinkable';
  if (s.endings.some((k) => k.startsWith('rare:'))) return 'the Plot-Twisted';
  const special: [string, string][] = [['built:pond', 'of the Indoor Pond'], ['kevin_saved', 'Friend of Kevin'], ['reg_road', 'the Tortoise-Friendly'], ['gary_help', "Gary's Mate"], ['cheese_job', 'the Cheese-Appointer'], ['bev_f1', 'the Fast and Furious']];
  for (const [f, n] of special) if (s.flags[f]) return n;
  if (nights <= 1) return 'the Briefly Employed';
  const mineSwipes = s.swipes.filter((w) => !s.daveDays.includes(w.day));
  if (!mineSwipes.length) return 'the Absent';
  const avg = (m: MeterId) => mineSwipes.reduce((n, w) => n + w.after[m], 0) / mineSwipes.length;
  if (avg('treasury') >= 65) return 'the Thrifty';
  const top = [...GROUPS].sort((a, b) => avg(b) - avg(a))[0]!;
  return { people: "the People's Champion", business: 'the Sponsored', law: 'the Strict', press: 'the Photogenic' }[top];
}
function WeekRecap({ s, streak, fresh, onNewWeek }: { s: State; streak: number; fresh: { endings: string[]; deeds: string[] }; onNewWeek: () => void }) {
  const nights = s.won.filter(Boolean).length;
  const played = DAY_NAMES.map((d, i) => ({ d, i, vote: s.polls[i], won: !!s.won[i], randy: s.daveDays.includes(i + 1) }));
  const mineDays = played.filter((x) => !x.randy && x.vote !== undefined);
  const best = mineDays.map((x) => ({ ...x, pts: dayScore(s, x.i + 1).total })).sort((a, b) => b.pts - a.pts)[0];
  const odd = s.swipes.filter((w) => !s.daveDays.includes(w.day) && crowd[w.cardId]?.[w.dir] !== undefined).sort((a, b) => crowd[a.cardId]![a.dir]! - crowd[b.cardId]![b.dir]!)[0];
  const oddCard = odd ? findCard(pack, odd.cardId) : null;
  const met = [...new Set(s.swipes.filter((w) => !s.daveDays.includes(w.day)).map((w) => findCard(pack, w.cardId).who))].filter((w) => ODDBALLS.includes(w));
  const endings = [...new Set(s.endings)];
  const name = `${s.profile?.mayor ?? 'Mayor'} ${nickname(s)}`;
  const text = `Mayor of Bad Town · ${pack.theme.name} · ${name}\nRe-elected ${nights} of 7 nights ${played.map((x) => (x.vote === undefined ? '⬜' : x.won ? '✅' : '❌')).join('')}${streak > 1 ? ` · 🔥 ${streak}` : ''}`;
  useEffect(() => { sfx(nights >= 4 ? 'win' : 'drum'); }, []);
  return (
    <div class="review recap">
      <div class="bugle"><div class="masthead"><span>THE BUGLE</span><small>The week in review</small></div>
        <h2 class="recap-name">{name}</h2>
        <p class="recap-sub">{pack.theme.name}. Re-elected <b>{nights} of 7</b> nights.{streak > 1 ? ` 🔥 ${streak} in a row.` : ''}</p>
        <ol class="recap-days">{played.map((x) => <li key={x.d} class={x.vote === undefined ? '' : x.won ? 'won' : 'lost'}><span>{x.d}</span><b>{x.vote === undefined ? '–' : `${x.vote}%`}</b><small>{x.randy ? 'Randy' : x.vote === undefined ? '' : x.won ? 'won' : 'lost'}</small></li>)}</ol>
      </div>
      {best && <p class="recap-line"><b>Best day:</b> {best.d}, {best.pts} pts ({tierOf(best.pts).name}).</p>}
      {odd && oddCard && <div class="recap-odd"><b>Your oddest call</b><Portrait who={oddCard.who} size={48} mood="neutral" /><span>“{fill(oddCard.text).slice(0, 90)}{oddCard.text.length > 90 ? '…' : ''}” You said <i>{fill(oddCard.options[odd.dir]!.label)}</i>. Only {crowd[odd.cardId]![odd.dir]}% of mayors agreed.</span></div>}
      {met.length > 0 && <div class="recap-met"><b>Oddballs you dealt with</b><span>{met.map((w) => <Portrait key={w} who={w} size={40} mood="pleased" />)}</span></div>}
      {endings.length > 0 && <><h3 class="subhead">Endings this week</h3><div class="endings">{endings.map((k) => <EndingCard key={k} k={k} isNew={fresh.endings.includes(k)} />)}</div></>}
      {fresh.deeds.map((id) => <p key={id} class="bonus"><b>Deed: {DEEDS.find((d) => d.id === id)!.name}.</b> {DEEDS.find((d) => d.id === id)!.how}.</p>)}
      <div class="dayend-btns">
        <button class="btn" onClick={() => { try { void navigator.clipboard.writeText(text); } catch { /* clipboard blocked */ } sfx('tap'); }}>Copy the week</button>
        <button class="btn primary" disabled>A new week starts Monday</button>
      </div>
      {PREVIEW && <button class="linkbtn" onClick={onNewWeek}>Testing: start the next week now</button>}
    </div>
  );
}

// ---------- ribbon cutting ----------
/** Stop the swinging scissors in the gold zone. Three tries before Gerald cuts it with his face. Success = right. */
function RibbonCard({ card, onResult, meet }: { card: Card; onResult: (d: Dir) => void; meet?: boolean }) {
  const ZONE = [42, 58];
  const [tries, setTries] = useState(0);
  const [done, setDone] = useState<null | 'hit' | 'miss'>(null);
  const [miss, setMiss] = useState(false);
  const [, setF] = useState(0);
  const pos = useRef(0);
  const t = useRef(0);
  useEffect(() => {
    if (done) return;
    let raf = 0, last = performance.now();
    const speed = (reduced() ? 0.35 : 0.7) + tries * 0.25; // sweeps per second, faster each try
    const tick = (now: number) => { t.current += Math.min(0.05, (now - last) / 1000) * speed; last = now; const p = t.current % 2; pos.current = (p < 1 ? p : 2 - p) * 100; setF((f) => f + 1); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done, tries]);
  const cut = () => {
    if (done) return;
    const hit = pos.current >= ZONE[0]! && pos.current <= ZONE[1]!;
    if (hit) { setDone('hit'); sfx('win'); setTimeout(() => onResult('right'), 1000); return; }
    sfx('honk'); setMiss(true); setTimeout(() => setMiss(false), 300);
    if (tries + 1 >= 3) { setDone('miss'); setTimeout(() => onResult('left'), 1200); } else setTries(tries + 1);
  };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); cut(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); });
  const gerald = done === 'miss' ? 3 : tries;
  return (
    <div class="stage">
      <div class={`card cutcard ${done ?? ''} ${miss ? 'shake' : ''}`}>
        <span class="sneak-tag">{done === 'hit' ? 'SNIP!' : done === 'miss' ? 'GERALD GOT THERE' : `TRY ${tries + 1} OF 3`}</span>
        <div class="card-who"><Portrait who={card.who} size={110} mood={done === 'miss' ? 'pleased' : 'annoyed'} /><span>{NAMES[card.who] ?? card.who}</span></div>
        {meet && <Meet />}
        <p class="card-text">{fill(card.text)}</p>
        <div class="ribbon-track" aria-hidden="true">
          <i class="ribbon-zone" style={{ left: `${ZONE[0]}%`, width: `${ZONE[1]! - ZONE[0]!}%` }} />
          <i class="ribbon-band" />
          <b class="scissors" style={{ left: `${done === 'hit' ? (ZONE[0]! + ZONE[1]!) / 2 : pos.current}%` }}>✂</b>
        </div>
        <div class="goose-lane" aria-label={`Gerald is ${3 - gerald} steps away`}><span class="goose-walk" style={{ left: `${gerald * 30}%` }}><Portrait who="gerald" size={34} mood="annoyed" /></span><span class="goose-goal">🎀</span></div>
      </div>
      <button class="btn mg-big ribbon-btn" onClick={cut} disabled={!!done}>{done === 'hit' ? 'Opened!' : done === 'miss' ? 'Honk.' : 'CUT!'}</button>
      <p class="hint">Tap when the scissors are in the gold. Every miss, Gerald gets closer.</p>
    </div>
  );
}

// ---------- app ----------
export function App() {
  const [save, setSave] = useState<Save>(() => { const sv = loadSave(); setMuted(sv.muted); return sv; });
  const [s, setS] = useState<State>(() => boot(save));
  const [preview, setPreview] = useState<Dir | null>(null);
  const [reveal, setReveal] = useState<RevealData | null>(null);
  const [fresh, setFresh] = useState<{ endings: string[]; deeds: string[] }>({ endings: [], deeds: [] });
  const [overlay, setOverlay] = useState<'book' | 'names' | 'dev' | 'goals' | null>(null);
  const taps = useRef<number[]>([]);
  const cal = useMemo(() => calendar(save.dayOffset), [save.dayOffset]);
  const introKey = `${s.weekId}:${s.day}`;
  const showIntro = save.introSeen !== introKey && s.phase === 'card' && !(s.day === 1 && s.cardInDay === 0 && !s.daveDays.length && save.introSeen === '');

  const persist = (next: State, patch: Partial<Save> = {}) => {
    const rec = record({ ...save, ...patch }, next);
    if (rec.endings.length || rec.deeds.length) setFresh((f) => ({ endings: [...f.endings, ...rec.endings], deeds: [...f.deeds, ...rec.deeds] }));
    const sv = { ...rec.save, state: next };
    setSave(sv); setS(next); writeSave(sv);
  };
  useEffect(() => { writeSave({ ...save, state: s }); }, []);
  // real crowd shares for this week, when the stats service is configured
  const [, setCrowdVersion] = useState(0);
  useEffect(() => {
    let alive = true;
    void fetchCrowd(pack.id, s.weekId).then((c) => { if (alive && c) { live = c; useWeek(s.weekId); setCrowdVersion((v) => v + 1); } });
    return () => { alive = false; };
  }, [s.weekId, s.day]);

  const swipe = (dir: Dir) => {
    const card = findCard(pack, s.current!);
    const next = reduce(s, { type: 'swipe', dir }, pack);
    sendVote(pack.id, s.weekId, card.id, dir);
    persist(next, ODDBALLS.includes(card.who) && !save.met.includes(card.who) ? { met: [...save.met, card.who] } : {});
    if (card.who === 'gerald') sfx('honk');
    if (next.phase === 'recalled') sfx('lose');
    setReveal({ key: Date.now(), card, dir, before: s.meters, after: next.meters, pct: crowd[card.id]?.[dir], recalled: next.phase === 'recalled', goals: next.objectivesDone.filter((g) => !s.objectivesDone.includes(g)).map((g) => pack.objectives.find((o) => o.id === g)?.text ?? g) });
  };

  const jump = (days: number) => {
    const sv = { ...save, dayOffset: save.dayOffset + days, state: s };
    const next = boot(sv);
    setSave({ ...sv, state: next }); setS(next); writeSave({ ...sv, state: next }); setOverlay(null);
  };
  const advance = () => {
    if (cal.today > s.day || s.day >= 7 || s.phase === 'recalled') { persist(reduce(s, { type: 'next' }, pack)); sfx('paper'); }
    else jump(1);
  };
  const titleTap = () => { if (!PREVIEW) return;
    const now = Date.now(); taps.current = [...taps.current.filter((t) => now - t < 700), now]; if (taps.current.length >= 3) { taps.current = []; setOverlay('dev'); } };

  who.mayor = s.profile?.mayor ?? save.lastProfile?.mayor ?? 'Mayor';
  who.folk = s.profile?.folk ?? save.lastProfile?.folk ?? 'Bad Towners';
  const card = s.phase === 'card' && s.current ? findCard(pack, s.current) : null;
  const meet = !!card && ODDBALLS.includes(card.who) && !save.met.includes(card.who);
  const today = dayScore(s, s.day);
  const choice = card && preview ? card.options[preview] ?? null : null;
  const dayName = DAY_NAMES[s.day - 1]!;
  const needSetup = !s.profile && s.phase === 'card' && !s.result;

  return (
    <div class="app">
      <header class="top">
        <h1 onClick={titleTap} aria-label="Mayor of Bad Town"><i class="pre">Mayor of </i><span>Bad Town</span></h1>
        <div class="top-right">
          <span class="daychip">{dayName}{s.phase === 'card' ? <span class="dc-n"> {s.cardInDay + 1}/{TUNING.cardsPerDay}</span> : ''}</span>
          <span class="scorechip" aria-label={`Today's score ${today.total}`}><b>{today.total}</b><span class="pts-word"> pts</span></span>
          <span class="streakchip" aria-label={`Re-elected ${save.streak.current} nights in a row`}>🔥 {save.streak.current}</span>
          {<button class="goalchip" aria-label={`This week's goals: ${s.objectivesDone.length} of ${pack.objectives.length} done`} onClick={() => { setOverlay('goals'); sfx('paper'); }}>★ {s.objectivesDone.length}/{pack.objectives.length}</button>}
          <button class="icon" aria-label="Open the scrapbook" onClick={() => { setOverlay('book'); sfx('paper'); }}><Icon.book /></button>
          <button class="icon" aria-label={save.muted ? 'Turn sound on' : 'Turn sound off'} onClick={() => { setMuted(!save.muted); persist(s, { muted: !save.muted }); }}><Icon.sound on={!save.muted} /></button>
        </div>
      </header>
      <div class="layout">
        <aside class="side">
          <ol class="timeline" aria-label="The week">{DAY_NAMES.map((d, i) => <li key={d} class={`${i + 1 === s.day ? 'now' : i + 1 < s.day ? 'past' : ''} ${s.won[i] === undefined ? '' : s.won[i] ? 'won' : 'lost'}`}><span>{d}</span><b>{s.polls[i] !== undefined ? `${s.won[i] ? '✓' : '✗'} ${s.polls[i]}%` : ''}</b>{s.daveDays.includes(i + 1) && <i>Randy</i>}</li>)}</ol>
        </aside>
        <main class="main">
          <Meters s={s} preview={choice} />
          {reveal && <ImpactReveal key={reveal.key} r={reveal} onDone={() => setReveal(null)} />}
          {card && !showIntro && !needSetup && !reveal && (card.ribbon ? <RibbonCard key={`${card.id}-${s.count}`} card={card} meet={meet} onResult={swipe} /> : card.sneak ? <SneakCard key={`${card.id}-${s.count}`} card={card} meet={meet} onResult={swipe} /> : <SwipeCard key={`${card.id}-${s.count}`} card={card} locked={!!overlay} meet={meet} onPreview={setPreview} onSwipe={swipe} />)}
          {s.phase === 'card' && <div class="progress" aria-label={`Card ${s.cardInDay + 1} of ${TUNING.cardsPerDay} today`}>{Array.from({ length: TUNING.cardsPerDay }, (_, i) => <i key={i} class={i < s.cardInDay ? 'done' : i === s.cardInDay ? 'now' : ''} />)}</div>}
          {s.phase === 'recalled' && !reveal && (
            <div class="panel recall">
              <div class="stamp denied big">{s.endings[s.endings.length - 1]?.startsWith('rare:') ? 'PLOT TWIST' : 'RECALLED'}</div>
              <EndingCard k={s.endings[s.endings.length - 1]!} isNew={fresh.endings.includes(s.endings[s.endings.length - 1]!)} />
              <p class="hint warn">Today's over, and so is tonight's vote. Tomorrow you run again: everything restarts at {TUNING.recall.reset}.</p>
              <button class="btn primary" onClick={() => { persist(reduce(s, { type: 'next' }, pack)); sfx('paper'); }}>See tonight's result</button>
            </div>
          )}
          {s.phase === 'dayEnd' && !needSetup && !reveal && <DayReview s={s} streak={save.streak.current} fresh={fresh.endings} onNext={advance} nextLabel={s.day >= 7 ? 'The week in review' : cal.today > s.day ? `Start ${DAY_NAMES[s.day] ?? 'tomorrow'}` : ''} wait={s.day >= 7 || cal.today > s.day ? null : `${DAY_NAMES[s.day] ?? 'Tomorrow'} opens in ${Math.floor(cal.msToMidnight / 3600000)}h ${Math.floor((cal.msToMidnight % 3600000) / 60000)}m`} sub={<p class="cliff">{pack.cliffhangers[s.day - 1]}</p>} />}
          {s.phase === 'results' && !reveal && <WeekRecap s={s} streak={save.streak.current} fresh={fresh} onNewWeek={() => jump(8 - cal.today)} />}
        </main>
      </div>

      {showIntro && !needSetup && (
        <Sheet label="This morning">
          <div class="bugle"><div class="masthead"><span>THE BUGLE</span><small>{dayName} morning</small></div>
            <p class="theme-line"><b>{pack.theme.name}</b> {pack.theme.text}</p>
            <h2>{s.daveDays.includes(s.day - 1) ? 'RACCOON HANDS BACK TOWN, KEEPS SOME OF IT' : (() => { const last = s.swipes.filter((w) => w.day === s.day - 1).map((w) => findCard(pack, w.cardId).story).filter((x) => x && x !== 'town' && x !== 'pressure'); return last.length ? `${pack.headlines[last[last.length - 1]!]}: THE LATEST` : 'A NEW DAY DAWNS, RELUCTANTLY'; })()}</h2>
            {s.daveDays.length > 0 && s.daveDays.includes(s.day - 1) && <div class="speaker"><Portrait who="randy" size={56} mood="pleased" /><p class="bubble">You were out, so I was mayor again for {s.daveDays.length} day{s.daveDays.length > 1 ? 's' : ''}. Best {s.daveDays.length > 1 ? 'days' : 'day'} this town ever had. Don't check the bins. Don't check the vault. Don't check my coat.</p></div>}
            {s.day > 1 && s.polls[s.day - 2] !== undefined && <p class="hint">Last night: <b>{s.won[s.day - 2] ? 're-elected' : 'voted out'}</b> with {s.polls[s.day - 2]}%. Tonight you need {TUNING.vote.pass}% again.{save.streak.current > 1 ? ` 🔥 ${save.streak.current} in a row.` : ''}</p>}
          </div>
          <Goals s={s} />
          <button class="btn primary" autoFocus onClick={() => persist(s, { introSeen: introKey })}>To work</button>
        </Sheet>
      )}
      {needSetup && (save.onboarded ? <Setup title={`A new term, ${save.lastProfile?.mayor ?? 'Mayor'}. Same again?`} initial={save.lastProfile} onDone={(profile) => { persist(reduce(s, { type: 'setup', profile }, pack), { lastProfile: profile }); sfx('win'); }} />
        : <Opening onDone={(profile) => { persist(reduce(s, { type: 'setup', profile }, pack), { onboarded: true, lastProfile: profile, introSeen: introKey }); }} />)}
      {overlay === 'names' && s.profile && <Setup title="Rename things" rename initial={s.profile} onDone={(p) => { persist(reduce(s, { type: 'rename', mayor: p.mayor, folk: p.folk }, pack), { lastProfile: { ...p, base: s.profile!.base } }); setOverlay(null); }} />}
      {overlay === 'goals' && <Sheet label="This week's goals" onClose={() => setOverlay(null)}><Goals s={s} /><button class="btn primary" onClick={() => setOverlay(null)}>Back to work</button></Sheet>}
      {overlay === 'book' && <Scrapbook save={save} onClose={() => setOverlay(null)} onRename={s.profile ? () => setOverlay('names') : undefined} />}
      {overlay === 'dev' && (
        <Sheet label="Dev panel" onClose={() => setOverlay(null)}>
          <h2 class="display">Dev panel</h2>
          <button class="btn" onClick={() => jump(1)}>Jump to the next day</button>
          <button class="btn" onClick={() => { const sv: Save = { ...save, state: null, introSeen: '', dayOffset: 0 }; const n = boot(sv); setSave({ ...sv, state: n }); setS(n); writeSave({ ...sv, state: n }); setOverlay(null); }}>Reset everything</button>
        </Sheet>
      )}
    </div>
  );
}
