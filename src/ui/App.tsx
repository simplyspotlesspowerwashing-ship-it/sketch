import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { week1Pack as pack } from '../content/index.ts';
import { voteParts, voteShare } from '../engine/election.ts';
import { coverMissedDays, findCard, newTerm, options, reduce } from '../engine/engine.ts';
import { TUNING } from '../engine/tuning.ts';
import { RARITY, dayScore, rarityOf, tierOf } from '../engine/score.ts';
import type { Crowd } from '../engine/score.ts';
import crowdData from '../content/packs/week1.crowd.json' with { type: 'json' };
import { GROUPS, METERS } from '../engine/types.ts';
import type { Card, Choice, Dir, GroupId, MeterId, Profile, State } from '../engine/types.ts';
import { GROUP_COLOR, GROUP_NAME, HOME, Icon, LEADER, NAMES, Portrait, Town } from './art.tsx';
import type { Mood, TownView } from './art.tsx';
import { DAY_NAMES, calendar, loadSave, setMuted, sfx, writeSave } from './platform.ts';
import type { Save } from './platform.ts';

/** Preview crowd data: simulated until real players exist; always labelled as such. */
const crowd = crowdData.cards as Crowd;
const PREVIEW = crowdData.simulated;
/** Card text can say {mayor} and {folk}; filled from the player's names. */
const who = { mayor: 'Mayor', folk: 'Bad Towners' };
const fill = (t: string) => t.replaceAll('{mayor}', who.mayor).replaceAll('{folk}', who.folk);
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const METER_NAME: Record<MeterId, string> = { ...GROUP_NAME, treasury: 'Treasury' };
const METER_COLOR: Record<MeterId, string> = { ...GROUP_COLOR, treasury: '#B58D55' };
const ARROW: Record<Dir, string> = { left: '←', right: '→', up: '↑', down: '↓' };

function boot(save: Save): State {
  try { return bootUnsafe(save); } catch { return bootUnsafe({ ...save, state: null }); }
}
function bootUnsafe(save: Save): State {
  const cal = calendar(save.dayOffset);
  const kept = save.state && save.state.v === 9 && save.state.weekId === cal.weekId && save.state.day <= cal.today ? save.state : null;
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
            <span class="hbar small"><i class="now" style={{ width: `${v}%` }} /></span>
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
interface RevealData { key: number; card: Card; dir: Dir; before: Record<MeterId, number>; after: Record<MeterId, number>; pct: number | undefined; recalled: boolean; flags: Record<string, true>; day: number; fresh: string | null }

/** What parades through town after a card: the story's own creatures, else whoever brought the card. */
const STORY_SCENE: Record<string, string> = { goose: 'goose', bear: 'bear', frogs: 'frog', heli: 'heli', rocket: 'rocket', pigeon: 'pigeon', kevin: 'hole', casino: 'coin', sock: 'drop', stranger: 'cheese', randy: 'raccoon', dave: 'raccoon', bev: 'car', nora: 'bolt', whiskers: 'paper', marcel: 'ghost', sal: 'pie', coach: 'star', sheila: 'star', brayden: 'note' };
const WHO_SCENE: Record<string, string> = { gerald: 'goose', randy: 'raccoon', timmy: 'kid', steve: 'cloud', sal: 'pie', bev: 'car', nora: 'bolt', marcel: 'ghost', whiskers: 'paper', coach: 'star', sheila: 'star', brayden: 'note' };
const sceneOf = (c: Card) => (c.story && STORY_SCENE[c.story]) || WHO_SCENE[c.who] || null;

const pick = <T,>(xs: T[], seed: string) => { let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0; return xs[Math.abs(h) % xs.length]!; };
const MOODS = {
  up: { small: ['Pleased', 'Nodding along', 'Quietly chuffed', 'Warming to you'], big: ['LOVE IT', 'OVER THE MOON', 'CARRYING YOU ON THEIR SHOULDERS', 'WRITING YOU A SONG'] },
  down: { small: ['Grumbling', 'Unimpressed', 'Tutting loudly', 'Sighing on purpose'], big: ['FURIOUS', 'OUTRAGED', 'DRAFTING A PETITION', 'SHOUTING AT A CLOUD'] },
  cashUp: { small: ['A bit richer', 'Coins found down the sofa'], big: ['KA-CHING', 'COFFERS OVERFLOWING'] },
  cashDown: { small: ['A bit poorer', 'Wallet sighs'], big: ['MONEY ON FIRE', 'THE PIGGY BANK WEEPS'] },
};
const moodLine = (m: MeterId, d: number, seed: string) => {
  const set = m === 'treasury' ? (d > 0 ? MOODS.cashUp : MOODS.cashDown) : d > 0 ? MOODS.up : MOODS.down;
  return pick(Math.abs(d) >= 10 ? set.big : set.small, seed + m);
};

function CountUp({ to, ms = 650 }: { to: number; ms?: number }) {
  const [v, setV] = useState(reduced() ? to : 0);
  useEffect(() => {
    if (reduced()) return;
    let raf = 0; const t0 = performance.now();
    const f = (now: number) => { const p = Math.min(1, (now - t0) / ms); setV(Math.round(to * (1 - (1 - p) ** 3))); if (p < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <>{v > 0 ? '+' : v < 0 ? '−' : ''}{Math.abs(v)}</>;
}

function SlideBar({ m, from, to }: { m: MeterId; from: number; to: number }) {
  const [w, setW] = useState(reduced() ? to : from);
  useEffect(() => { const t = setTimeout(() => setW(to), 120); return () => clearTimeout(t); }, []);
  return (
    <span class="rv-bar">
      <i class="zone low" style={{ width: `${TUNING.low}%` }} />
      {m !== 'treasury' && <i class="zone high" style={{ width: `${100 - TUNING.high}%` }} />}
      <i class="fill" style={{ width: `${w}%` }} />
      <i class="ghost" style={{ left: `${from}%` }} />
    </span>
  );
}

/** Particles: confetti and hearts for a gain, a storm for a loss, coins for the treasury. */
function RowFx({ m, d }: { m: MeterId; d: number }) {
  const big = Math.abs(d) >= 10;
  if (m === 'treasury') return (
    <span class={`rv-fx ${d > 0 ? 'coins-in' : 'coins-out'}`} aria-hidden="true">
      {Array.from({ length: big ? 9 : 5 }, (_, k) => <i key={k} style={{ '--x': `${(k * 37) % 100}%`, '--d': `${(k * 70) % 400}ms`, '--r': `${(k * 53) % 360}deg` }}><Icon.coin size={18} /></i>)}
    </span>
  );
  if (d > 0) return (
    <span class="rv-fx cheer" aria-hidden="true">
      {Array.from({ length: big ? 18 : 10 }, (_, k) => <i key={k} class="cf" style={{ '--a': `${(k * 360) / (big ? 18 : 10) + (k % 3) * 7}deg`, '--dist': `${50 + (k * 29) % 50}px`, '--c': k % 3 === 0 ? 'var(--gold)' : k % 3 === 1 ? METER_COLOR[m] : '#fff', '--d': `${(k % 4) * 30}ms` }} />)}
      {Array.from({ length: big ? 4 : 2 }, (_, k) => <b key={k} class="heart" style={{ '--x': `${-18 + k * 14}px`, '--d': `${120 + k * 140}ms` }}>♥</b>)}
    </span>
  );
  return (
    <span class={`rv-fx storm ${big ? 'big' : ''}`} aria-hidden="true">
      <svg class="cloud" viewBox="0 0 60 30" width="58" height="29"><path d="M12 26 Q2 26 4 18 Q4 10 14 11 Q18 2 30 4 Q40 0 45 10 Q58 9 56 19 Q56 26 46 26 Z" fill="#6E6A78" stroke="#29231F" stroke-width="2.5" stroke-linejoin="round" /></svg>
      {Array.from({ length: big ? 8 : 5 }, (_, k) => <i key={k} class="drop" style={{ '--x': `${8 + k * (44 / (big ? 8 : 5))}px`, '--d': `${(k * 97) % 500}ms` }} />)}
      {big && <svg class="bolt" viewBox="0 0 20 36" width="18" height="32"><path d="M12 0 L2 20 L9 20 L6 36 L18 13 L11 13 L14 0 Z" fill="#FFD84A" stroke="#29231F" stroke-width="2" stroke-linejoin="round" /></svg>}
    </span>
  );
}

const MOOD_OF = (d: number): Mood => (d > 0 ? 'pleased' : 'annoyed');

function ImpactReveal({ r, onDone }: { r: RevealData; onDone: () => void }) {
  const ch = r.card.options[r.dir]!;
  const ms = METERS.filter((m) => r.after[m] !== r.before[m]).sort((a, b) => Math.abs(r.after[b] - r.before[b]) - Math.abs(r.after[a] - r.before[a]));
  const rar = rarityOf(r.pct);
  const net = ms.reduce((n, m) => n + r.after[m] - r.before[m], 0);
  const tone = ms.length === 0 ? 'flat' : ms.every((m) => r.after[m] > r.before[m]) ? 'good' : ms.every((m) => r.after[m] < r.before[m]) ? 'bad' : net >= 0 ? 'mixed good' : 'mixed bad';
  // stage 0: stamp + character; 1..n: one group each; n+1: crowd; n+2: hold
  const INTRO = 620, ROW = 400, CROWD = 480, HOLD = r.recalled ? 1800 : 1150;
  const [step, setStep] = useState(reduced() ? 99 : 0);
  const [chars, setChars] = useState(reduced() ? 999 : 0);
  useEffect(() => { sfx('stamp'); }, []);
  useEffect(() => {
    if (reduced()) return;
    const t = setInterval(() => setChars((c) => c + 2), 18);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (step > ms.length + 1) return;
    const t = setTimeout(() => {
      const m = ms[step];
      if (m) sfx(r.after[m] > r.before[m] ? (m === 'treasury' ? 'coin' : 'win') : 'warn');
      else if (r.recalled) sfx('lose');
      else sfx(rar.points >= 30 ? 'honk' : 'tap');
      setStep(step + 1);
    }, step === 0 ? INTRO : step <= ms.length ? ROW : CROWD);
    return () => clearTimeout(t);
  }, [step]);
  useEffect(() => { const t = setTimeout(onDone, reduced() ? 1800 : INTRO + ms.length * ROW + CROWD + HOLD); return () => clearTimeout(t); }, []);
  const headline = ms.length === 0 ? 'Nobody noticed. Somehow that is worse.'
    : ms.slice(0, 3).map((m) => { const d = r.after[m] - r.before[m]; return m === 'treasury' ? (d > 0 ? 'Treasury up' : 'Treasury down') : `${METER_NAME[m]} ${d > 0 ? 'up' : 'down'}`; }).join(' · ');
  const full = fill(ch.reaction);
  const reaction = full.slice(0, chars);
  const focus = ms[0];
  const [fx, fy] = [!focus ? 200 : focus === 'treasury' ? 211 : HOME[focus as GroupId][0], 112]; // aim at street level, where the crowds gather
  const effects: Record<string, number> = {};
  for (const m of ms) effects[m] = r.after[m] - r.before[m];
  const view: TownView = { day: r.day, approval: { people: r.after.people, business: r.after.business, law: r.after.law, press: r.after.press }, flags: r.flags, fresh: r.fresh };
  const crowdIn = step > ms.length;
  return (
    <button class={`impact tone-${tone.replace(' ', ' tone-')} ${r.recalled && crowdIn ? 'recalled' : ''}`} onClick={onDone} aria-label={`${fill(ch.label)}. ${headline}. Tap to continue`}>
      <span class="rv-rays" aria-hidden="true" />
      <span class="rv-flash" aria-hidden="true" />
      {tone === 'good' && (
        <span class={`rv-weather ${tone}`} aria-hidden="true">
          {Array.from({ length: tone === 'good' ? 28 : 34 }, (_, k) => <i key={k} style={{ '--x': `${(k * 37) % 100}%`, '--d': `${(k * 113) % 900}ms`, '--r': `${(k * 71) % 360}deg`, '--c': ['var(--gold)', 'var(--people)', 'var(--business)', 'var(--law)', 'var(--press)', '#fff'][k % 6] }} />)}
        </span>
      )}
      <span class="rv-flashline" aria-hidden="true"><b>BUGLE FLASH</b> {headline}</span>
      <span class={`rv-stamp from-${r.dir}`}><b>{ARROW[r.dir]}</b>{fill(ch.label)}</span>
      <span class="rv-scene">
        <span class="rv-cam" style={{ '--tx': `${50 - Math.min(68, Math.max(32, fx / 4))}%`, '--ty': `${50 - Math.min(68, Math.max(32, fy / 1.7))}%` }}><Town s={view} pulse={{ key: r.key, effects }} scene={sceneOf(r.card)} /></span>
      </span>
      <span class="rv-hero">
        <span class={`rv-face mood-${net >= 0 ? 'up' : 'down'}`}><Portrait who={r.card.who} size={64} mood={ms.length ? MOOD_OF(net) : 'neutral'} /></span>
        <span class="rv-bubble"><span class="rv-who">{NAMES[r.card.who] ?? r.card.who}</span>“{reaction}”{chars >= full.length && ch.then?.length ? <small>This isn't over.</small> : null}</span>
      </span>
      <span class="rv-rows">
        {ms.map((m, i) => {
          const d = r.after[m] - r.before[m], up = d > 0, big = Math.abs(d) >= 10;
          const edge = r.after[m] <= TUNING.low || (m !== 'treasury' && r.after[m] >= TUNING.high);
          if (i >= step) return <span key={m} class="rv-row pending" />;
          return (
            <span key={m} class={`rv-row ${up ? 'up' : 'down'} ${big ? 'big' : ''}`} style={{ '--g': METER_COLOR[m] }}>
              <span class="rv-actor">
                {m === 'treasury' ? <span class="rv-coin"><Icon.coin size={40} /></span> : <Portrait who={LEADER[m as GroupId]!} size={48} ring={METER_COLOR[m]} mood={MOOD_OF(d)} />}
                <RowFx m={m} d={d} />
              </span>
              <span class="rv-text"><b>{METER_NAME[m]}</b><small>{moodLine(m, d, r.card.id + r.dir)}</small></span>
              <span class="rv-num"><span class="arrow">{up ? '▲' : '▼'}</span><CountUp to={d} /></span>
              <SlideBar m={m} from={r.before[m]} to={r.after[m]} />
              {edge && <span class="rv-edge">{r.after[m] <= TUNING.low ? (m === 'treasury' ? 'Running dry' : 'Close to revolt') : 'Getting too powerful'}</span>}
            </span>
          );
        })}
      </span>
      {crowdIn && r.pct !== undefined && (
        <span class={`rv-crowd r-${rar.id}`}>
          <span class="rv-crowdbar"><i style={{ width: `${Math.max(3, r.pct)}%` }} /><em style={{ left: `${Math.max(3, r.pct)}%` }}>YOU</em></span>
          <span class="rv-crowdtext"><b>{r.pct}%</b> of mayors did this{PREVIEW && <span class="tag">preview data</span>}</span>
          <span class="rv-rarity">{rar.emoji} {rar.name}<b>+{TUNING.score.perCard + rar.points}</b></span>
          {rar.points >= 30 && <span class="rv-sparkle" aria-hidden="true">{Array.from({ length: 12 }, (_, k) => <i key={k} style={{ '--a': `${k * 30}deg` }}>✦</i>)}</span>}
        </span>
      )}
      {r.recalled && crowdIn && <span class="rv-recall">RECALLED</span>}
      <span class="impact-skip">Tap anywhere to continue</span>
    </button>
  );
}

/** One tense moment a day: hold to wind up, let go while they're not looking. */
function SneakCard({ card, onResult }: { card: Card; onResult: (d: Dir) => void }) {
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
        <p class="card-text">{fill(card.text)}</p>
        <span class="sneak-charge"><i style={{ width: `${s.charge * 100}%` }} /></span>
      </div>
      <button class={`btn mg-big sneak-btn ${s.holding ? 'go' : ''}`} onPointerDown={press} onPointerUp={release} onPointerLeave={release}>{s.holding ? (s.charge >= 1 ? 'NOW! Let go!' : 'Winding up…') : 'Hold, then let go'}</button>
      <p class="hint">Hold to wind up, release while they're not looking. Hold too long and your arm gives out.</p>
    </div>
  );
}

// ---------- the swipe card ----------
const THRESH = 90;
function dirOf(x: number, y: number): Dir { return Math.abs(x) >= Math.abs(y) ? (x > 0 ? 'right' : 'left') : (y > 0 ? 'down' : 'up'); }

function SwipeCard({ card, onPreview, onSwipe, locked }: { card: Card; onPreview: (d: Dir | null) => void; onSwipe: (d: Dir) => void; locked: boolean }) {
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [leaving, setLeaving] = useState<Dir | null>(null);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const dirs = options(card);
  const cur = drag && Math.hypot(drag.x, drag.y) > 24 ? dirOf(drag.x, drag.y) : null;
  const valid = cur && card.options[cur] ? cur : null;
  useEffect(() => { onPreview(valid); }, [valid]);
  const commit = (d: Dir) => {
    if (locked || leaving || !card.options[d]) return;
    setLeaving(d); setDrag(null); onPreview(null); sfx('paper');
    setTimeout(() => onSwipe(d), reduced() ? 0 : 260);
  };
  useEffect(() => {
    const k = (e: KeyboardEvent) => { const m: Record<string, Dir> = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' }; const d = m[e.key]; if (d && card.options[d]) { e.preventDefault(); commit(d); } };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  });
  const fly = leaving ? { left: [-700, 60, -30], right: [700, 60, 30], up: [0, -700, 0], down: [0, 700, 0] }[leaving] : null;
  const style = fly ? { transform: `translate(${fly[0]}px, ${fly[1]}px) rotate(${fly[2]}deg)`, transition: 'transform .26s ease-in', opacity: 0.6 }
    : drag ? { transform: `translate(${drag.x}px, ${drag.y * 0.8}px) rotate(${drag.x / 14}deg)`, transition: 'none' } : {};
  return (
    <div class="stage">
      <div class="card" style={style}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={(e) => { if (locked || leaving) return; e.preventDefault(); getSelection()?.removeAllRanges(); (e.currentTarget as Element).setPointerCapture(e.pointerId); start.current = { x: e.clientX, y: e.clientY, id: e.pointerId }; setDrag({ x: 0, y: 0 }); }}
        onPointerMove={(e) => { if (start.current) setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y }); }}
        onPointerUp={() => { const d = drag; start.current = null; setDrag(null); if (d && Math.hypot(d.x, d.y) > THRESH) { const dir = dirOf(d.x, d.y); if (card.options[dir]) { commit(dir); return; } } onPreview(null); }}
        onPointerCancel={() => { start.current = null; setDrag(null); onPreview(null); }}>
        <div class="card-who"><Portrait who={card.who} size={110} mood={valid ? 'annoyed' : 'neutral'} /><span>{NAMES[card.who] ?? card.who}</span></div>
        <p class="card-text">{fill(card.text)}</p>
        {valid && <div class={`choice-banner ${valid}`}>{fill(card.options[valid]!.label)}</div>}
        <p class="card-hint">Drag the card {dirs.map((d) => ARROW[d]).join(' ')}</p>
      </div>
      <div class={`choices n${dirs.length}`}>
        {(['up', 'left', 'right', 'down'] as Dir[]).filter((d) => card.options[d]).map((d) => <button key={d} class={`edge-chip ${d} ${valid === d ? 'on' : ''}`} onClick={() => commit(d)} aria-label={`${ARROW[d]} ${fill(card.options[d]!.label)}`}><b>{ARROW[d]}</b><span>{fill(card.options[d]!.label)}</span></button>)}
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

function EffectList({ before, after, stagger = 0 }: { before: Record<MeterId, number>; after: Record<MeterId, number>; stagger?: number }) {
  const ms = METERS.filter((m) => after[m] !== before[m]);
  if (!ms.length) return <span class="eff none">No change</span>;
  return <>{ms.map((m, i) => { const d = after[m] - before[m]; return <span key={m} class={`eff ${d > 0 ? 'up' : 'down'}`} style={{ '--g': METER_COLOR[m], 'animation-delay': `${Math.min(stagger, 700) + i * 90}ms` }}><i class="dot" />{METER_NAME[m]} {d > 0 ? '▲ +' : '▼ −'}{Math.abs(d)}</span>; })}</>;
}

/** The day in review: every card you played, what you chose, and what it did, story by story. */
function DayReview({ s, onNext, nextLabel, sub }: { s: State; onNext: () => void; nextLabel: string; sub?: preact.ComponentChildren }) {
  const sc = dayScore(s, s.day, crowd);
  const tier = tierOf(sc.total);
  const grid = sc.picks.map((p) => p.rarity.emoji);
  const rows: string[] = [];
  for (let i = 0; i < grid.length; i += 5) rows.push(grid.slice(i, i + 5).join(''));
  const share = `Mayor of Bad Town · ${DAY_NAMES[s.day - 1]} · ${sc.total} pts · ${tier.name}${sc.recalled ? ' · RECALLED' : ''}\n${rows.join('\n')}`;
  const today = s.swipes.filter((w) => w.day === s.day);
  const byStory = new Map<string, typeof today>();
  for (const w of today) { const st = findCard(pack, w.cardId).story ?? 'town'; byStory.set(st, [...(byStory.get(st) ?? []), w]); }
  const brewing = [...new Set(s.queue.map((q) => findCard(pack, q.cardId).story ?? 'town'))];
  const poll = s.polls[s.polls.length - 1] ?? voteShare(s);
  const prevPoll = s.polls[s.polls.length - 2];
  let n = 0;
  return (
    <div class="review">
      <div class="bugle"><div class="masthead"><span>THE BUGLE</span><small>{DAY_NAMES[s.day - 1]} · the day in review</small></div>
        <div class="poll-row"><span class="bigpoll">{poll}%</span><span>{prevPoll !== undefined ? <b class={poll >= prevPoll ? 'up' : 'down'}>{poll >= prevPoll ? '▲' : '▼'} {Math.abs(poll - prevPoll)} since yesterday</b> : 'If the election were today'}<small>50% wins on Sunday</small></span></div>
      </div>
      <div class="dayscore">
        <span class="bigscore">{sc.total}<small>pts</small></span>
        <span><b class="tiername">{tier.name}</b><small>{sc.picks.length} cards × {TUNING.score.perCard} + {sc.rarity} for rare choices{sc.recalled ? ` − ${TUNING.score.recall} for the recall` : ''}</small></span>
      </div>
      <div class="raritykey">{RARITY.slice(0, 4).map((r) => <span key={r.id}>{r.emoji} {r.name} +{r.points}</span>)}{PREVIEW && <span class="tag">preview data</span>}</div>
      <pre class="share">{share}</pre>
      <button class="btn" onClick={() => { try { void navigator.clipboard.writeText(share); } catch { /* clipboard blocked */ } sfx('tap'); }}>Copy today's result</button>
      <div class="dayswing">{METERS.map((m) => <div key={m} class="swing" style={{ '--g': METER_COLOR[m] }}><span>{METER_NAME[m]}</span><span class="hbar"><i class="was" style={{ width: `${s.dayStart[m]}%` }} /><i class="now" style={{ width: `${s.meters[m]}%` }} /></span><b>{s.meters[m] - s.dayStart[m] > 0 ? '+' : ''}{s.meters[m] - s.dayStart[m] || '·'}</b></div>)}</div>
      {[...byStory].map(([story, ws]) => (
        <section key={story} class="story">
          <h3>{pack.headlines[story] ?? story}</h3>
          {ws.map((w) => { const c = findCard(pack, w.cardId); const ch = c.options[w.dir]!; const i = n++; return (
            <div key={`${w.cardId}${i}`} class="beat" style={{ 'animation-delay': `${i * 140}ms` }}>
              <Portrait who={c.who} size={34} />
              <div><p class="beat-text">{fill(c.text)}</p><p class="beat-choice"><b>{ARROW[w.dir]} {fill(ch.label)}</b> <span class="effs"><EffectList before={w.before} after={w.after} stagger={i * 140 + 200} />{crowd[w.cardId]?.[w.dir] !== undefined && <span class="eff crowdeff">{rarityOf(crowd[w.cardId]![w.dir]).emoji} {crowd[w.cardId]![w.dir]}% did this</span>}</span></p></div>
            </div>
          ); })}
        </section>
      ))}
      {brewing.length > 0 && <p class="brewing"><b>Still brewing:</b> {brewing.map((b) => (pack.headlines[b] ?? b).toLowerCase()).join(' · ')}</p>}
      {sub}
      <button class="btn primary" onClick={onNext} autoFocus>{nextLabel}</button>
    </div>
  );
}

// ---------- scrapbook ----------
const ENDING_ORDER = ['term:won', 'term:landslide', 'term:lost', 'term:early', 'low:people', 'low:business', 'low:law', 'low:press', 'low:treasury', 'high:people', 'high:business', 'high:law', 'high:press'];
const resultEnding = (s: State) => (!s.result ? null : s.result.endedEarly ? 'term:early' : s.result.won ? (s.result.share >= 60 ? 'term:landslide' : 'term:won') : 'term:lost');
interface Deed { id: string; name: string; how: string; test: (s: State, save: Save) => boolean }
const DEEDS: Deed[] = [
  { id: 'firstWin', name: 'First Term', how: 'Win an election', test: (s) => !!s.result?.won },
  { id: 'landslide', name: 'Landslide', how: 'Win with 60% or more', test: (s) => (s.result?.share ?? 0) >= 60 },
  { id: 'whisker', name: 'By a Whisker', how: 'Win with 50% or 51%', test: (s) => !!s.result?.won && s.result.share <= 51 },
  { id: 'comeback', name: 'Comeback Kid', how: 'Win despite a recall', test: (s) => !!s.result?.won && s.recalls > 0 },
  { id: 'pond', name: 'Pond Life', how: 'See the goose saga through to the goslings', test: (s) => s.seen.includes('g6') },
  { id: 'detective', name: 'Detective', how: 'Uncover the Stranger', test: (s) => !!s.flags.exposed || !!s.flags.hush },
  { id: 'bearfriend', name: 'Bear Necessities', how: 'Get the bear elected', test: (s) => s.swipes.some((w) => w.cardId === 'b3' && w.dir === 'right') },
  { id: 'kevin', name: 'Kevin Forever', how: 'Let Kevin become a tourist attraction', test: (s) => !!s.flags.kevin_famous },
  { id: 'frogs', name: 'Frog Democracy', how: 'Give the frogs the vote', test: (s) => !!s.flags.frog_vote },
  { id: 'collector', name: 'Collector', how: 'Unlock six endings', test: (_s, save) => save.scrapbook.length >= 6 },
];
function record(save: Save, s: State): { save: Save; endings: string[]; deeds: string[] } {
  const endings = [...new Set([...s.recallCauses, resultEnding(s)].filter((x): x is string => !!x))].filter((k) => !save.scrapbook.includes(k));
  let next: Save = endings.length ? { ...save, scrapbook: [...save.scrapbook, ...endings] } : save;
  const deeds = DEEDS.filter((d) => !next.deeds.includes(d.id) && d.test(s, next)).map((d) => d.id);
  if (deeds.length) next = { ...next, deeds: [...next.deeds, ...deeds] };
  if (s.result && !next.career.weeks.includes(s.weekId)) next = { ...next, career: { terms: next.career.terms + 1, wins: next.career.wins + (s.result.won ? 1 : 0), best: Math.max(next.career.best, s.result.share), weeks: [...next.career.weeks, s.weekId] } };
  return { save: next, endings, deeds };
}
function EndingCard({ k, isNew }: { k: string; isNew?: boolean }) {
  const e = pack.endings[k]!;
  return <div class={`ending ${k.split(':')[0]}`}>{isNew && <span class="newtag">NEW IN YOUR SCRAPBOOK</span>}<b>{e.title}</b><span>{e.text}</span></div>;
}
function Scrapbook({ save, onClose }: { save: Save; onClose: () => void }) {
  const c = save.career;
  return (
    <Sheet label="Scrapbook" onClose={onClose}>
      <h2 class="display">The Mayor's Scrapbook</h2>
      <div class="career"><span><b>{c.terms}</b>weeks served</span><span><b>{c.wins}</b>re-elections</span><span><b>{c.best ? `${c.best}%` : '–'}</b>best result</span></div>
      <h3 class="subhead">Endings <small>{save.scrapbook.length} of {ENDING_ORDER.length}</small></h3>
      <div class="endings">{ENDING_ORDER.map((k) => save.scrapbook.includes(k) ? <EndingCard key={k} k={k} /> : <div key={k} class="ending locked"><b>???</b><span>{k.startsWith('term') ? 'How a week ended' : k.startsWith('low:treasury') ? 'Ran out of money' : `${k.startsWith('low') ? 'Lost' : 'Far too loved by'} ${METER_NAME[k.split(':')[1] as MeterId]}`}</span></div>)}</div>
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
      <p>Randy is a raccoon. Nobody is sure how he got elected. Randy is very sure. He ran on a platform of “bins, but more of them”.</p>
      <p class="op-quote">“I was a great mayor. Ask anyone. Don't ask the bins.” <b>— Randy</b></p>
    </div>,
    <div class="op-slide" key="2">
      <div class="op-ballot"><span class="op-votes"><b>You</b><i style={{ '--w': '100%' }} /><em>1 vote</em></span><span class="op-votes randy"><b>Randy</b><i style={{ '--w': '0%' }} /><em>0 votes*</em></span></div>
      <h2 class="op-title">Then you ran against him. And won. By one vote.</h2>
      <p>*Randy is demanding a recount. He has eaten the ballots. He is now your Deputy, because nobody could find the paperwork to fire him. He also ate the paperwork.</p>
    </div>,
    <div class="op-slide" key="3">
      <div class="op-cast">{GROUPS.map((g, k) => <span key={g} class="op-castmember" style={{ '--g': GROUP_COLOR[g], 'animation-delay': `${k * 120}ms` }}><Portrait who={LEADER[g]!} size={64} ring={GROUP_COLOR[g]} mood="neutral" /><b>{GROUP_NAME[g]}</b><small>{NAMES[LEADER[g]!]?.split(',')[0]}</small></span>)}<span class="op-castmember" style={{ '--g': '#B58D55', 'animation-delay': '480ms' }}><Portrait who="doug" size={64} ring="#B58D55" mood="annoyed" /><b>Treasury</b><small>Doug</small></span></div>
      <h2 class="op-title">Five things can get you thrown out.</h2>
      <p>The People, Business, the Law and the Press all want something from you, every hour, forever. Let any of them get <b>too unhappy</b> and they recall you. Let any of them get <b>too happy</b> and they take over, which is worse. Run out of <b>money</b> and Doug cries, then recalls you.</p>
    </div>,
    <div class="op-slide" key="4">
      <div class="op-demo"><span class="op-card"><Portrait who="gerald" size={70} mood="annoyed" /><small>The geese would like a pond. In your office.</small></span><span class="op-hand">👆</span></div>
      <h2 class="op-title">25 problems a day. Swipe to decide.</h2>
      <p>Drag the card left, right, up or down (or tap the buttons). You won't see what a choice does until you've made it. Then you'll definitely see it.</p>
      <p>Every mayor gets the same problems each day, so afterwards you'll see how many made the same call. Weird choices score more.</p>
      <p><b>Sunday is the election.</b> You need 50%. Most mayors don't get it.</p>
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

// ---------- election night ----------
function Results({ s, fresh, onNewWeek }: { s: State; fresh: { endings: string[]; deeds: string[] }; onNewWeek: () => void }) {
  const r = s.result!;
  const parts = voteParts(s);
  const rows: [string, number, string][] = [['People', parts.people, GROUP_COLOR.people], ['Business', parts.business, GROUP_COLOR.business], ['Law', parts.law, GROUP_COLOR.law], ['Press', parts.press, GROUP_COLOR.press], ['Treasury', parts.treasury, '#B58D55'], ['Goals met', parts.objectives, '#6B6257'], ['Campaign', parts.campaign, '#6B6257'], ['Recalls', parts.recalls, '#C23B3B'], ['The town is grumpy', TUNING.vote.base - 50, '#6B6257']];
  const [step, setStep] = useState(reduced() ? rows.length + 1 : 0);
  useEffect(() => {
    if (step > rows.length) return;
    if (step === 0) sfx('drum');
    const t = setTimeout(() => { setStep(step + 1); sfx(step === rows.length ? (r.won ? 'win' : 'lose') : 'tap'); }, step === rows.length ? 1000 : 520);
    return () => clearTimeout(t);
  }, [step]);
  const k = resultEnding(s)!;
  const text = `Mayor of Bad Town · ${s.profile?.mayor ?? 'Mayor'} · week of ${s.weekId} — ${r.won ? 'Re-elected' : 'Voted out'} with ${r.share}%${s.recalls ? ` · ${s.recalls} recall${s.recalls > 1 ? 's' : ''}` : ''}`;
  return (
    <div class="panel election">
      <h2 class="display">Election night</h2>
      <div class="districts">{rows.map(([name, v, c], i) => <div key={name} class={`district ${i < step ? 'in' : ''}`} style={{ '--g': c }}><span>{name}</span><b class={v >= 0 ? 'up' : 'down'}>{v >= 0 ? '+' : '−'}{Math.abs(Math.round(v * 10) / 10)}</b></div>)}</div>
      {step > rows.length && <div class="verdict">
        <div class="bigpoll">{r.share}%</div>
        <div class={`banner ${r.won ? 'won' : 'lost'}`}>{r.won ? 'RE-ELECTED' : 'VOTED OUT'}</div>
        <EndingCard k={k} isNew={fresh.endings.includes(k)} />
        {fresh.deeds.map((id) => <p key={id} class="bonus"><b>Deed: {DEEDS.find((d) => d.id === id)!.name}.</b> {DEEDS.find((d) => d.id === id)!.how}.</p>)}
        <pre class="share">{text}</pre>
        <button class="btn" onClick={() => { try { void navigator.clipboard.writeText(text); } catch { /* select instead */ } sfx('tap'); }}>Copy result</button>
        <button class="btn ghost" onClick={onNewWeek}>Start the next week now <small>preview only</small></button>
      </div>}
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
  const [overlay, setOverlay] = useState<'book' | 'names' | 'dev' | null>(null);
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

  const swipe = (dir: Dir) => {
    const card = findCard(pack, s.current!);
    const next = reduce(s, { type: 'swipe', dir }, pack);
    persist(next);
    if (card.who === 'gerald') sfx('honk');
    if (next.phase === 'recalled') sfx('lose');
    const fresh = Object.keys(next.flags).find((f) => f.startsWith('built:') && !s.flags[f]) ?? null;
    if (!isSunday) setReveal({ key: Date.now(), card, dir, before: s.meters, after: next.meters, pct: crowd[card.id]?.[dir], recalled: next.phase === 'recalled', flags: next.flags, day: s.day, fresh });
  };

  const jump = (days: number) => {
    const sv = { ...save, dayOffset: save.dayOffset + days, state: s };
    const next = boot(sv);
    setSave({ ...sv, state: next }); setS(next); writeSave({ ...sv, state: next }); setOverlay(null);
  };
  const advance = () => {
    if (cal.today > s.day || s.phase === 'recalled') { persist(reduce(s, { type: 'next' }, pack)); sfx('paper'); }
    else jump(1);
  };
  const titleTap = () => { const now = Date.now(); taps.current = [...taps.current.filter((t) => now - t < 700), now]; if (taps.current.length >= 3) { taps.current = []; setOverlay('dev'); } };

  who.mayor = s.profile?.mayor ?? save.lastProfile?.mayor ?? 'Mayor';
  who.folk = s.profile?.folk ?? save.lastProfile?.folk ?? 'Bad Towners';
  const card = s.phase === 'card' && s.current ? findCard(pack, s.current) : null;
  const today = dayScore(s, s.day, crowd);
  const choice = card && preview ? card.options[preview] ?? null : null;
  const dayName = DAY_NAMES[s.day - 1]!;
  const needSetup = !s.profile && s.phase === 'card' && !s.result;
  const isSunday = s.day >= 7;

  return (
    <div class="app">
      <header class="top">
        <h1 onClick={titleTap}>Mayor of <span>Bad Town</span></h1>
        <div class="top-right">
          <span class="daychip">{dayName}{s.phase === 'card' && !isSunday ? ` ${s.cardInDay + 1}/${TUNING.cardsPerDay}` : ''}</span>
          {!isSunday && <span class="scorechip" aria-label={`Today's score ${today.total}`}><b>{today.total}</b> pts</span>}
          {s.profile && <button class="icon" aria-label="Rename" onClick={() => setOverlay('names')}><Icon.pen /></button>}
          <button class="icon" aria-label="Open the scrapbook" onClick={() => { setOverlay('book'); sfx('paper'); }}><Icon.book /></button>
          <button class="icon" aria-label={save.muted ? 'Turn sound on' : 'Turn sound off'} onClick={() => { setMuted(!save.muted); persist(s, { muted: !save.muted }); }}><Icon.sound on={!save.muted} /></button>
        </div>
      </header>
      <div class="layout">
        <aside class="side">
          <ol class="timeline" aria-label="The week">{DAY_NAMES.map((d, i) => <li key={d} class={i + 1 === s.day ? 'now' : i + 1 < s.day ? 'past' : ''}><span>{d}</span><b>{i === 6 ? (s.result ? `${s.result.share}%` : 'Vote') : s.polls[i] !== undefined ? `${s.polls[i]}%` : ''}</b>{s.daveDays.includes(i + 1) && <i>Randy</i>}</li>)}</ol>
          <div class="threads">
            <h3>Stories in play</h3>
            {(() => { const live = [...new Set(s.queue.map((q) => findCard(pack, q.cardId).story ?? 'town'))]; return live.length ? <ul>{live.map((x) => <li key={x}>{pack.headlines[x] ?? x} <small>to be continued…</small></li>)}</ul> : <p class="hint">Nothing brewing. Yet.</p>; })()}
            <h3>This week's goals</h3>
            <ul class="goals">{pack.objectives.map((o) => <li key={o.id} class={s.objectivesDone.includes(o.id) ? 'done' : ''}>{s.objectivesDone.includes(o.id) ? '★' : '○'} {o.text} <small>+{TUNING.vote.objective}% votes</small></li>)}</ul>
          </div>
        </aside>
        <main class="main">
          <Meters s={s} preview={choice} />
          {reveal && <ImpactReveal key={reveal.key} r={reveal} onDone={() => setReveal(null)} />}
          {card && !showIntro && !needSetup && !reveal && (card.sneak ? <SneakCard key={`${card.id}-${s.count}`} card={card} onResult={swipe} /> : <SwipeCard key={`${card.id}-${s.count}`} card={card} locked={!!overlay} onPreview={setPreview} onSwipe={swipe} />)}
          {s.phase === 'card' && !isSunday && <div class="progress" aria-label={`Card ${s.cardInDay + 1} of ${TUNING.cardsPerDay} today`}>{Array.from({ length: TUNING.cardsPerDay }, (_, i) => <i key={i} class={i < s.cardInDay ? 'done' : i === s.cardInDay ? 'now' : ''} />)}</div>}
          {s.phase === 'recalled' && !reveal && (
            <div class="panel recall">
              <div class="stamp denied big">RECALLED</div>
              <EndingCard k={s.recallCauses[s.recallCauses.length - 1]!} isNew={fresh.endings.includes(s.recallCauses[s.recallCauses.length - 1]!)} />
              <p class="hint warn">Today's over. You'll be back tomorrow as Acting Mayor: everything resets to {TUNING.recall.reset} and Sunday's vote takes {TUNING.recall.election}. {s.recalls >= TUNING.recall.max ? 'One more and the term is over.' : ''}</p>
              <button class="btn primary" onClick={() => { persist(reduce(s, { type: 'next' }, pack)); sfx('paper'); }}>See the day in review</button>
            </div>
          )}
          {s.phase === 'dayEnd' && !needSetup && !reveal && <DayReview s={s} onNext={advance} nextLabel={cal.today > s.day ? `Start ${DAY_NAMES[s.day] ?? 'tomorrow'}` : `Play ${DAY_NAMES[s.day] ?? 'tomorrow'} now (preview only)`} sub={<p class="cliff">{pack.cliffhangers[s.day - 1]}</p>} />}
          {s.phase === 'results' && !reveal && <Results s={s} fresh={fresh} onNewWeek={() => jump(8 - cal.today)} />}
        </main>
      </div>

      {showIntro && !needSetup && (
        <Sheet label="This morning">
          <div class="bugle"><div class="masthead"><span>THE BUGLE</span><small>{dayName} morning</small></div>
            <h2>{s.daveDays.includes(s.day - 1) ? 'RACCOON HANDS BACK TOWN, KEEPS SOME OF IT' : isSunday ? 'ELECTION DAY' : (() => { const last = s.swipes.filter((w) => w.day === s.day - 1).map((w) => findCard(pack, w.cardId).story).filter((x) => x && x !== 'town' && x !== 'pressure'); return last.length ? `${pack.headlines[last[last.length - 1]!]}: THE LATEST` : 'A NEW DAY DAWNS, RELUCTANTLY'; })()}</h2>
            {s.daveDays.length > 0 && s.daveDays.includes(s.day - 1) && <div class="speaker"><Portrait who="randy" size={56} mood="pleased" /><p class="bubble">You were out, so I was mayor again for {s.daveDays.length} day{s.daveDays.length > 1 ? 's' : ''}. Best {s.daveDays.length > 1 ? 'days' : 'day'} this town ever had. Don't check the bins. Don't check the vault. Don't check my coat.</p></div>}
            <p class="hint">Poll this morning: <b>{voteShare(s)}%</b>. You need 50% on Sunday.</p>
          </div>
          <button class="btn primary" autoFocus onClick={() => persist(s, { introSeen: introKey })}>To work</button>
        </Sheet>
      )}
      {needSetup && (save.onboarded ? <Setup title={`A new term, ${save.lastProfile?.mayor ?? 'Mayor'}. Same again?`} initial={save.lastProfile} onDone={(profile) => { persist(reduce(s, { type: 'setup', profile }, pack), { lastProfile: profile }); sfx('win'); }} />
        : <Opening onDone={(profile) => { persist(reduce(s, { type: 'setup', profile }, pack), { onboarded: true, lastProfile: profile, introSeen: introKey }); }} />)}
      {overlay === 'names' && s.profile && <Setup title="Rename things" rename initial={s.profile} onDone={(p) => { persist(reduce(s, { type: 'rename', mayor: p.mayor, folk: p.folk }, pack), { lastProfile: { ...p, base: s.profile!.base } }); setOverlay(null); }} />}
      {overlay === 'book' && <Scrapbook save={save} onClose={() => setOverlay(null)} />}
      {overlay === 'dev' && (
        <Sheet label="Dev panel" onClose={() => setOverlay(null)}>
          <h2 class="display">Dev panel</h2>
          <button class="btn" onClick={() => jump(1)}>Jump to the next day</button>
          <button class="btn" onClick={() => { const sv: Save = { ...save, state: null, introSeen: '', dayOffset: 0 }; const n = boot(sv); setSave({ ...sv, state: n }); setS(n); writeSave({ ...sv, state: n }); setOverlay(null); }}>Reset everything</button>
        </Sheet>
      )}
      <footer>Preview build</footer>
    </div>
  );
}
