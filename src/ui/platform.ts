// Everything that touches the browser outside rendering: the calendar, storage, sound, crowd stats.
import type { Profile, State } from '../engine/types.ts';

// ---------- storage (one module, versioned) ----------
const KEY = 'badtown.save';
const SCHEMA = 1;
/** Kept across weeks: what a mayor has seen and done. */
/** terms = weeks served, wins = nights re-elected, best = best nightly vote, nights = nights you played yourself. */
export interface Career { terms: number; wins: number; best: number; weeks: string[]; nights: number }
export interface Save {
  schema: number; state: State | null; playerSeed: string; muted: boolean; introSeen: string; tutorialDone: boolean; dayOffset: number;
  scrapbook: string[]; // ending keys unlocked
  career: Career;
  deeds: string[];
  onboarded: boolean; // saw the opening sequence
  lastProfile: Profile | null; // offered again at the start of each new term
  met: string[]; // oddballs already met
  streak: { current: number; best: number }; // nights re-elected in a row (Randy's nights pause it)
  counted: string; // `${weekId}|${nights}`: nights already added to the career and streak
  weeksDone: number; // your own weeks finished: picks this week's pack
  dayDoneOn: string; // the date you finished the current day ('' while playing): the next day opens after it
}

function fresh(): Save {
  const seed = Math.random().toString(36).slice(2) + Date.now().toString(36);
  return { schema: SCHEMA, state: null, playerSeed: seed, muted: false, introSeen: '', tutorialDone: false, dayOffset: 0, scrapbook: [], career: { terms: 0, wins: 0, best: 0, weeks: [], nights: 0 }, deeds: [], onboarded: false, lastProfile: null, met: [], streak: { current: 0, best: 0 }, counted: '', weeksDone: 0, dayDoneOn: '' };
}

/** Bring an older save up to the current schema. Unknown or broken saves start fresh. */
export function migrate(raw: unknown): Save {
  if (!raw || typeof raw !== 'object') return fresh();
  const s = raw as Partial<Save>;
  if (typeof s.schema !== 'number' || s.schema > SCHEMA || typeof s.playerSeed !== 'string') return fresh();
  // schema 1 is the first; fields added later (scrapbook, career, deeds) default from fresh().
  const f = fresh();
  return { ...f, ...s, career: { ...f.career, ...s.career }, streak: { ...f.streak, ...s.streak }, schema: SCHEMA };
}

export function loadSave(): Save {
  try { return migrate(JSON.parse(localStorage.getItem(KEY) ?? 'null')); } catch { return fresh(); }
}
export function writeSave(save: Save) {
  try { localStorage.setItem(KEY, JSON.stringify(save)); } catch { /* storage unavailable: play on without saving */ }
}

// ---------- calendar: your own days, one a calendar day ----------
/** Your week starts the day you start. Day 1 to Day 7, then the next week. */
export const DAY_NAMES = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
/** Today's local date (YYYY-MM-DD), shifted by the testing offset, and how long until the next day opens. */
export function calendar(dayOffset: number, now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset);
  const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
  return { dateKey, msToMidnight: midnight };
}

// ---------- sound: synthesised with Web Audio, no files ----------
let ctx: AudioContext | null = null;
let muted = false;
export function setMuted(m: boolean) { muted = m; }

function tone(freq: number, dur: number, type: OscillatorType, gain: number, at = 0, slideTo?: number) {
  if (!ctx) return;
  const t = ctx.currentTime + at;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noise(dur: number, gain: number, at = 0) {
  if (!ctx) return;
  const n = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = ctx.createBufferSource();
  const g = ctx.createGain();
  g.gain.value = gain;
  src.buffer = buf;
  src.connect(g).connect(ctx.destination);
  src.start(ctx.currentTime + at);
}

export type Sfx = 'tap' | 'stamp' | 'coin' | 'spend' | 'honk' | 'warn' | 'paper' | 'drum' | 'win' | 'lose';
/** Call from a user gesture. Sounds are short and quiet; vibration where the device supports it. */
export function sfx(name: Sfx) {
  if (muted) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
  } catch { return; }
  const buzz = (p: number | number[]) => { try { navigator.vibrate?.(p); } catch { /* unsupported */ } };
  switch (name) {
    case 'tap': tone(520, 0.05, 'triangle', 0.08); break;
    case 'paper': noise(0.09, 0.05); break;
    case 'stamp': tone(110, 0.16, 'square', 0.22, 0, 50); noise(0.07, 0.25); buzz(30); break;
    case 'coin': tone(988, 0.07, 'square', 0.07); tone(1319, 0.16, 'square', 0.07, 0.07); break;
    case 'spend': tone(440, 0.09, 'triangle', 0.1, 0, 300); tone(300, 0.14, 'triangle', 0.1, 0.09, 200); break;
    case 'honk': tone(330, 0.12, 'sawtooth', 0.12, 0, 290); tone(300, 0.2, 'sawtooth', 0.12, 0.13, 250); buzz([20, 40, 20]); break;
    case 'warn': tone(196, 0.14, 'square', 0.1); tone(185, 0.2, 'square', 0.1, 0.16); buzz(60); break;
    case 'drum': for (let i = 0; i < 14; i++) noise(0.04, 0.05 + i * 0.012, i * 0.07); break;
    case 'win': [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, 'triangle', 0.13, i * 0.12)); buzz([40, 60, 120]); break;
    case 'lose': [392, 349, 311, 262].forEach((f, i) => tone(f, 0.3, 'sawtooth', 0.08, i * 0.18)); break;
  }
}

// ---------- crowd stats: anonymous counts of yes and no per card ----------
// Set VITE_STATS_URL at build time to the stats worker (see worker/README.md). Without it the game
// uses simulated shares and labels them "preview". Nothing personal is sent: pack, week, card, answer.
const STATS_URL = (import.meta.env?.VITE_STATS_URL as string | undefined)?.replace(/\/$/, '') ?? '';
export const STATS_ENABLED = STATS_URL.length > 0;
/** Fewer real answers than this and a card keeps its simulated share. */
export const MIN_SAMPLE = 30;

/** Real yes/no shares for a week, for cards with enough answers; null if the service can't be reached. */
export async function fetchCrowd(pack: string, week: string): Promise<Record<string, { left: number; right: number }> | null> {
  if (!STATS_ENABLED) return null;
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4000);
    const res = await fetch(`${STATS_URL}/crowd?pack=${encodeURIComponent(pack)}&week=${encodeURIComponent(week)}`, { signal: ctl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const body = (await res.json()) as { cards?: Record<string, { left?: number; right?: number }> };
    const out: Record<string, { left: number; right: number }> = {};
    for (const [id, c] of Object.entries(body.cards ?? {})) {
      const l = Number(c.left ?? 0), r = Number(c.right ?? 0), n = l + r;
      if (n >= MIN_SAMPLE) { const right = Math.round((100 * r) / n); out[id] = { right, left: 100 - right }; }
    }
    return out;
  } catch { return null; }
}

/** Count one answer. Fire and forget: the game never waits for this. */
export function sendVote(pack: string, week: string, card: string, dir: string) {
  if (!STATS_ENABLED || (dir !== 'left' && dir !== 'right')) return;
  try {
    void fetch(`${STATS_URL}/vote`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pack, week, card, dir }), keepalive: true }).catch(() => {});
  } catch { /* offline: the vote is simply not counted */ }
}
