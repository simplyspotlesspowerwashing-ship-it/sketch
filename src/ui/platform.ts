// Everything that touches the browser outside rendering: the calendar, storage, sound, crowd stats.
import stats from '../content/packs/week1.stats.json' with { type: 'json' };
import type { State } from '../engine/types.ts';

// ---------- storage (one module, versioned) ----------
const KEY = 'badtown.save';
const SCHEMA = 1;
export interface Save { schema: number; state: State | null; playerSeed: string; muted: boolean; introSeen: string; tutorialDone: boolean; dayOffset: number }

function fresh(): Save {
  const seed = Math.random().toString(36).slice(2) + Date.now().toString(36);
  return { schema: SCHEMA, state: null, playerSeed: seed, muted: false, introSeen: '', tutorialDone: false, dayOffset: 0 };
}

/** Bring an older save up to the current schema. Unknown or broken saves start fresh. */
export function migrate(raw: unknown): Save {
  if (!raw || typeof raw !== 'object') return fresh();
  const s = raw as Partial<Save>;
  if (typeof s.schema !== 'number' || s.schema > SCHEMA || typeof s.playerSeed !== 'string') return fresh();
  // schema 1 is the first; future versions add steps here.
  return { ...fresh(), ...s, schema: SCHEMA };
}

export function loadSave(): Save {
  try { return migrate(JSON.parse(localStorage.getItem(KEY) ?? 'null')); } catch { return fresh(); }
}
export function writeSave(save: Save) {
  try { localStorage.setItem(KEY, JSON.stringify(save)); } catch { /* storage unavailable: play on without saving */ }
}

// ---------- calendar: local time, week starts Monday ----------
export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export function calendar(dayOffset: number, now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset);
  const today = ((d.getDay() + 6) % 7) + 1; // 1 = Monday ... 7 = Sunday
  const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (today - 1));
  const weekId = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
  return { today, weekId, msToMidnight: midnight };
}

// ---------- crowd stats ----------
export interface StatsProvider {
  /** true when the numbers are simulated, so the UI must label them */
  preview: boolean;
  recordChoice(week: string, cardId: string, option: number): void;
  getSplit(week: string, cardId: string): number[] | null; // percent per option
  recordResult(week: string, share: number): void;
  getPercentile(week: string, share: number): number; // percent of mayors beaten
}

/** Phase 1: local provider seeded from simulator runs (sim/stats.ts). Always labelled as preview data. */
export const previewStats: StatsProvider = {
  preview: true,
  recordChoice() {},
  getSplit: (_week, cardId) => (stats.cards as Record<string, number[]>)[cardId] ?? null,
  recordResult() {},
  getPercentile: (_week, share) => stats.sharePercentiles.filter((v) => v < share).length - 0,
};

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
