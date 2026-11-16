// The short film that plays after a choice. A clip is an act (the choreography), up to three props
// (emoji, or "@name" for one of the cast) and an optional sound word. Every act is a small scene on a
// drawn set with three beats: set-up, action, punchline. Animated in styles.css under "clips".
import type { ComponentChildren } from 'preact';
import type { Clip } from '../engine/types.ts';
import { INK, Portrait } from './art.tsx';
import type { Mood } from './art.tsx';

type V = Record<string, string | number>;
const v = (o: V) => o as Record<string, string>;
const many = (n: number, f: (i: number) => ComponentChildren) => Array.from({ length: n }, (_, i) => f(i));
/** Stable pseudo-random spread, so a clip plays the same way every time. */
const at = (i: number, a: number, b: number, m: number) => (i * a + b) % m;
const CAST_EMOJI: Record<string, string> = { randy: '🦝', gerald: '🦢', bev: '👵', chad: '🤑', doug: '😰', barb: '👮', whiskers: '🐈', marge: '📰', timmy: '👦', pam: '👩', linda: '📚', steve: '🌦️', stranger: '🕵️', sal: '👨‍🍳', coach: '📣', sheila: '🔮', nora: '🔬', brayden: '📱', marcel: '🤡', desk: '📜' };
/** Emoji for crowds of a thing; a single "@name" is drawn as that character. */
const plain = (g: string) => (g.startsWith('@') ? CAST_EMOJI[g.slice(1)] ?? '❓' : g);

interface O { a?: string; ad?: number; b?: string; bd?: number; c?: string; cd?: number; flip?: boolean; mood?: Mood; cls?: string }
/** One thing on the stage: where, how big, how it enters (a), what it does (b) and how it ends (c). */
function E(g: string, x: number, y: number, s: number, o: O = {}, key?: string | number) {
  const glyph = g.startsWith('@') ? <Portrait who={g.slice(1)} size={100} mood={o.mood ?? 'neutral'} /> : g;
  return (
    <span key={key} class={`cl-e ${o.cls ?? ''}`} style={v({ left: `${x}%`, top: `${y}%`, 'font-size': `${s}cqh` })}>
      <span class={o.a ?? ''} style={v({ '--d': `${o.ad ?? 0}s` })}><span class={o.b ?? ''} style={v({ '--d': `${o.bd ?? 0}s` })}><span class={o.c ?? ''} style={v({ '--d': `${o.cd ?? 0}s` })}>
        <span class={o.flip ? 'cl-flip' : ''}>{glyph}</span>
      </span></span></span>
    </span>
  );
}
/** A comic sound word in a burst. */
const W = (t: string, x: number, y: number, d: number, o: { out?: number; tone?: string; small?: boolean; rot?: number } = {}) => (
  <span key={`w${t}${d}`} class={`cl-word ${o.tone ?? ''} ${o.small ? 'small' : ''}`} style={v({ left: `${x}%`, top: `${y}%`, '--d': `${d}s`, '--out': `${o.out ?? 9}s`, '--rot': `${o.rot ?? -6}deg` })}><b>{t}</b></span>
);
const sparks = (x: number, y: number, d: number, n = 8, g = '✨') => many(n, (i) => <span key={`s${d}${i}`} class="cl-spark" style={v({ left: `${x}%`, top: `${y}%`, '--a': `${(i * 360) / n}deg`, '--d': `${d}s` })}>{g}</span>);
const dust = (x: number, y: number, d: number, n = 4) => many(n, (i) => E('💨', x - 14 + i * 9, y, 10, { a: 'a-puff', ad: d + i * 0.06 }, `d${d}${i}`));
const confetti = (d: number, n = 26) => many(n, (i) => <i key={`c${i}`} class="cl-confetti" style={v({ '--x': `${at(i, 37, 5, 100)}%`, '--d': `${d + at(i, 13, 0, 9) / 12}s`, '--c': ['#E8C55A', '#D9653B', '#3F8F5A', '#3B6FB6', '#fff'][i % 5]! })} />);
const flash = (d: number) => <span key={`f${d}`} class="cl-flash" style={v({ '--d': `${d}s` })} />;

// ---------- sets ----------
const S = { stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' as const };
const SETS: Record<string, ComponentChildren> = {
  office: <>
    <rect width="400" height="300" fill="#EFE2C4" /><rect y="210" width="400" height="90" fill="#C9A77A" {...S} />
    <rect x="270" y="36" width="92" height="88" rx="4" fill="#BFDDF0" {...S} /><path d="M316 36 v88 M270 80 h92" stroke={INK} stroke-width="2.5" /><path d="M284 70 q8 -10 18 -2 q8 -8 16 2z" fill="#fff" />
    <rect x="42" y="44" width="56" height="70" rx="3" fill="#FBF7EE" {...S} /><circle cx="70" cy="72" r="14" fill="#D9CDB6" {...S} /><path d="M52 104 q18 -22 36 0" fill="#D9CDB6" {...S} />
    <rect x="60" y="200" width="280" height="24" rx="4" fill="#8A5A3C" {...S} /><rect x="76" y="224" width="16" height="60" fill="#6B4B32" {...S} /><rect x="308" y="224" width="16" height="60" fill="#6B4B32" {...S} />
    <path d="M366 250 q-14 -40 4 -64 q14 26 4 64z M362 250 q-26 -24 -22 -50 q22 16 26 50z" fill="#5FA77A" {...S} /><rect x="352" y="248" width="26" height="26" rx="3" fill="#C8704A" {...S} />
  </>,
  street: <>
    <rect width="400" height="300" fill="#BFDDF0" /><circle cx="336" cy="52" r="24" fill="#F7D774" {...S} />
    <path d="M40 60 q-12 0 -10 -9 q2 -8 11 -6 q5 -9 15 -5 q9 3 7 12 q7 2 3 8z" fill="#fff" opacity=".9" />
    <rect x="14" y="110" width="84" height="110" fill="#D9653B" {...S} /><rect x="110" y="80" width="70" height="140" fill="#E6DBC6" {...S} /><rect x="232" y="96" width="78" height="124" fill="#B0892A" {...S} /><rect x="322" y="124" width="66" height="96" fill="#3F8F5A" {...S} />
    {[[26, 126], [62, 126], [26, 164], [62, 164], [122, 96], [150, 96], [122, 134], [150, 134], [244, 112], [280, 112], [244, 150], [280, 150], [334, 140], [362, 140]].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="20" height="22" fill="#FBF7EE" {...S} stroke-width="2" />)}
    <rect y="220" width="400" height="80" fill="#6B6257" {...S} /><path d="M10 260 h380" stroke="#F2EBDD" stroke-width="5" stroke-dasharray="34 24" />
  </>,
  park: <>
    <rect width="400" height="300" fill="#CFE8F3" /><circle cx="70" cy="56" r="24" fill="#F7D774" {...S} />
    <path d="M0 190 q90 -60 190 -22 q100 -46 210 8 v124 h-400z" fill="#9DBF8A" {...S} />
    <rect x="318" y="120" width="14" height="74" fill="#7A5234" {...S} /><circle cx="325" cy="100" r="44" fill="#5FA77A" {...S} /><circle cx="296" cy="124" r="24" fill="#5FA77A" {...S} />
    <path d="M300 50 q-10 0 -9 -8 q1 -7 9 -6 q4 -8 13 -5 q8 3 6 11 q6 2 3 8z" fill="#fff" opacity=".9" />
    <rect x="24" y="214" width="70" height="8" rx="3" fill="#8A5A3C" {...S} /><path d="M32 222 v20 M86 222 v20 M24 204 h70" stroke={INK} stroke-width="4" />
  </>,
  court: <>
    <rect width="400" height="300" fill="#C9A77A" />{[0, 80, 160, 240, 320].map((x) => <rect key={x} x={x + 6} y="14" width="68" height="150" rx="4" fill="#B58D55" {...S} stroke-width="2" />)}
    <rect x="70" y="150" width="260" height="150" rx="6" fill="#7A5234" {...S} /><rect x="50" y="138" width="300" height="20" rx="4" fill="#8A5A3C" {...S} />
    <circle cx="200" cy="212" r="26" fill="#E8C55A" {...S} /><path d="M186 212 h28 M200 198 v28" stroke={INK} stroke-width="3" />
  </>,
  press: <>
    <rect width="400" height="300" fill="#3A322C" />{[40, 150, 260].map((x, i) => <g key={x}><circle cx={x + 50} cy={i % 2 ? 250 : 60} r="34" fill="#6B6257" {...S} /><circle cx={x + 50} cy={i % 2 ? 250 : 60} r="8" fill="#29231F" /></g>)}
    <path d="M0 150 h400" stroke="#FBF7EE" stroke-width="40" opacity=".12" />
  </>,
  sky: <>
    <rect width="400" height="300" fill="#9FB9CF" /><rect y="250" width="400" height="50" fill="#9DBF8A" {...S} />
    {[[40, 50], [170, 30], [290, 60]].map(([x, y]) => <path key={x} d={`M${x} ${y! + 30} q-18 0 -16 -14 q2 -12 16 -10 q8 -16 26 -9 q14 5 11 20 q11 2 6 13z`} fill="#6E7A8C" {...S} />)}
  </>,
  grey: <>
    <rect width="400" height="300" fill="#CFCAC0" /><rect y="226" width="400" height="74" fill="#A9A294" {...S} />
    {many(16, (i) => <path key={i} d={`M${at(i, 67, 20, 400)} ${at(i, 41, 10, 200)} l-6 18`} stroke="#8C97A3" stroke-width="3" stroke-linecap="round" />)}
  </>,
  stage: <>
    <rect width="400" height="300" fill="#4A2F5C" /><rect y="230" width="400" height="70" fill="#8A5A3C" {...S} />
    <path d="M0 0 h400 v34 q-25 22 -50 0 q-25 22 -50 0 q-25 22 -50 0 q-25 22 -50 0 q-25 22 -50 0 q-25 22 -50 0 q-25 22 -50 0 q-25 22 -50 0z" fill="#C23B3B" {...S} />
  </>,
};
const Backdrop = ({ name }: { name: string }) => <svg class="cl-set" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{SETS[name] ?? SETS.office}</svg>;

// ---------- acts ----------
interface Ctx { p: string[]; me: string; word: string; label: string; good: boolean }
type Act = { set: string; word: string; shake?: number; play: (c: Ctx) => ComponentChildren };
const ME = (c: Ctx, x: number, y: number, jumpAt: number, mood?: Mood) => E(`@${c.me}`, x, y, 22, { a: 'a-pop', mood: mood ?? (c.good ? 'pleased' : 'annoyed'), b: (mood ?? (c.good ? 'pleased' : 'annoyed')) === 'annoyed' ? 'b-fume' : 'b-jump', bd: jumpAt }, 'me');

const ACTS: Record<string, Act> = {
  /** A crane lowers it in, hammers go, the ribbon is cut. */
  build: { set: 'street', word: 'TA-DA!', shake: 1.15, play: (c) => <>
    {E('🚧', 50, 66, 16, { a: 'a-pop', c: 'c-out', cd: 0.6 })}
    <span class="cl-rope" />
    {E(c.p[0]!, 50, 58, 34, { a: 'a-drop', ad: 0.5 })}
    {E('🔨', 26, 48, 15, { a: 'a-pop', ad: 1.1, b: 'b-hammer', c: 'c-out', cd: 1.9 })}{E('🔨', 74, 48, 15, { a: 'a-pop', ad: 1.2, b: 'b-hammer', c: 'c-out', cd: 1.9, flip: true })}
    {W('BANG', 24, 24, 1.2, { out: 1.7, small: true })}{W('CLANG', 76, 26, 1.45, { out: 1.9, small: true, rot: 8 })}
    {dust(50, 80, 1.15)}
    {E('✂️', 50, 40, 14, { a: 'a-inR', ad: 1.9, c: 'c-out', cd: 2.3 })}
    {sparks(50, 54, 2.15)}{W(c.word, 50, 20, 2.15)}
    {c.p[1] && E(c.p[1], 80, 72, 20, { a: 'a-pop', ad: 2.3, b: 'b-jump' })}
    {ME(c, 16, 74, 2.2)}
  </> },
  /** The door swings open and the camera pushes in on it. */
  zoom: { set: 'office', word: 'DUN DUN DUUUN', shake: 1.75, play: (c) => <>
    <span class="cl-pushin">
      <span class="cl-spot" />
      {E(c.p[0]!, 50, 54, 36, { a: 'a-pop', ad: 0.9, b: 'b-bob' })}
      {c.p[1] && E(c.p[1], 74, 60, 20, { a: 'a-drop', ad: 1.6, b: 'b-bob' })}
      {c.p[1] && E('💦', 74, 74, 12, { a: 'a-puff', ad: 1.8 })}
      {c.p[2] && E(c.p[2], 26, 70, 18, { a: 'a-pop', ad: 2.1, b: 'b-wob' })}
    </span>
    <span class="cl-door"><i /></span>
    {E('❗', 26, 26, 16, { a: 'a-pop', ad: 1.7, b: 'b-jump' })}
    {W(c.word, 62, 18, 1.75, { tone: 'dark' })}
    {ME(c, 14, 78, 1.8)}
  </> },
  /** Everyone piles in: bunting, balloons, a trumpet, cake. */
  party: { set: 'street', word: 'WOO!', play: (c) => <>
    <span class="cl-bunting">{many(9, (i) => <i key={i} style={v({ '--c': ['#D9653B', '#E8C55A', '#3F8F5A', '#3B6FB6'][i % 4]!, '--d': `${i * 0.05}s` })} />)}</span>
    {E(c.p[0]!, 50, 56, 34, { a: 'a-pop', ad: 0.1, b: 'b-jump' })}
    {many(5, (i) => E('🎈', 12 + i * 19, 100, 13, { a: 'a-balloon', ad: 0.3 + i * 0.15 }, `b${i}`))}
    {confetti(0.4)}
    {E('🎺', 82, 54, 18, { a: 'a-inR', ad: 1.0, b: 'b-wob', flip: true })}{E('🎵', 70, 36, 10, { a: 'a-note', ad: 1.2 })}{E('🎶', 76, 30, 10, { a: 'a-note', ad: 1.6 })}
    {W(c.word, 30, 24, 0.8)}
    {c.p[1] && E(c.p[1], 28, 68, 20, { a: 'a-pop', ad: 0.6, b: 'b-jump', bd: 0.2 })}
    {E('🎂', 68, 76, 18, { a: 'a-drop', ad: 1.8 })}
    {ME(c, 14, 78, 0.5)}
  </> },
  /** It turns up hopeful. The big stamp comes down. */
  deny: { set: 'grey', word: 'NOPE.', shake: 1.2, play: (c) => <>
    {E('✨', 64, 36, 10, { a: 'a-pop', ad: 0.2, c: 'c-out', cd: 0.9 })}
    {E(c.p[0]!, 50, 60, 32, { a: 'a-inL', b: 'b-bob', c: 'c-squash', cd: 1.2 })}
    <span class="cl-press"><b>NO</b></span>
    {dust(50, 82, 1.2)}
    {W(c.word, 76, 24, 1.3, { tone: 'red', rot: 8 })}
    {c.p[1] && E(c.p[1], 80, 74, 16, { a: 'a-pop', ad: 0.4, c: 'c-outR', cd: 1.5 })}
    {E('🍂', 0, 84, 10, { a: 'a-tumble', ad: 1.9 })}
    {E('💢', 22, 54, 12, { a: 'a-pop', ad: 1.5, b: 'b-jump' })}
    {ME(c, 14, 78, 1.4, 'annoyed')}
  </> },
  /** A small, private rain cloud. And a violin. */
  sulk: { set: 'grey', word: '…sigh.', play: (c) => <>
    <span class="cl-puddle" />
    {E(c.p[0]!, 50, 60, 30, { a: 'a-pop', c: 'c-droop', cd: 0.5 })}
    {E('🌧️', 50, 26, 26, { a: 'a-inL', ad: 0.3, b: 'b-bob' })}
    {many(5, (i) => E('💧', 40 + i * 5, 40, 6, { a: 'a-drip', ad: 0.8 + i * 0.2 }, `r${i}`))}
    {E('🎻', 82, 62, 20, { a: 'a-inR', ad: 1.5, b: 'b-wob' })}{E('🎵', 74, 44, 9, { a: 'a-note', ad: 1.8 })}{E('🎵', 80, 40, 9, { a: 'a-note', ad: 2.2 })}
    {W(c.word, 26, 26, 1.9, { tone: 'dark', small: true })}
    {ME(c, 14, 78, 1.2, 'annoyed')}
  </> },
  /** Going, going, gone: the gavel, the SOLD tag, a fountain of coins. */
  cashin: { set: 'office', word: 'KA-CHING!', shake: 0.8, play: (c) => <>
    {E(c.p[0]!, 34, 56, 30, { a: 'a-pop', c: 'c-outL', cd: 1.3 })}
    {E('🔨', 52, 34, 16, { a: 'a-pop', ad: 0.3, b: 'b-hammer', c: 'c-out', cd: 1.0 })}
    {W('SOLD!', 34, 26, 0.85, { out: 1.5, tone: 'red' })}
    {E('💰', 70, 62, 30, { a: 'a-pop', ad: 0.9, b: 'b-swell', bd: 1.3 })}
    {many(12, (i) => <span key={i} class="cl-coin in" style={v({ '--d': `${1.3 + i * 0.07}s`, '--h': `${-30 - at(i, 7, 0, 22)}cqh`, '--from': '-38cqw' })}>🪙</span>)}
    {sparks(70, 58, 2.1, 6, '🪙')}{W(c.word, 66, 22, 2.1)}
    {c.p[1] && E(c.p[1], 22, 76, 16, { a: 'a-pop', ad: 1.6, b: 'b-wob' })}
    {ME(c, 14, 78, 2.1)}
  </> },
  /** The wallet opens. A moth flies out. Something arrives in a box. */
  cashout: { set: 'office', word: 'PAID.', play: (c) => <>
    {E('👛', 24, 60, 26, { a: 'a-pop', b: 'b-wob', c: 'c-shrink', cd: 0.4 })}
    {many(8, (i) => <span key={i} class="cl-coin out" style={v({ '--d': `${0.3 + i * 0.09}s`, '--h': `${-28 - at(i, 5, 0, 18)}cqh`, '--from': '0cqw' })}>🪙</span>)}
    {many(3, (i) => E('💸', 30 + i * 8, 46, 12, { a: 'a-flyup', ad: 0.5 + i * 0.25 }, `m${i}`))}
    {E('🦋', 24, 50, 10, { a: 'a-flutter', ad: 1.3 })}
    {E('📦', 70, 60, 30, { a: 'a-drop', ad: 1.1, b: 'b-rattle', bd: 1.5, c: 'c-out', cd: 1.95 })}
    {E('💨', 70, 58, 26, { a: 'a-puff', ad: 1.9 })}
    {E(c.p[0]!, 70, 58, 30, { a: 'a-pop', ad: 2.0, b: 'b-jump' })}
    {c.p[1] && E(c.p[1], 50, 78, 16, { a: 'a-pop', ad: 2.3 })}
    {sparks(70, 56, 2.05, 6)}{W(c.word, 46, 22, 2.1)}
    {ME(c, 12, 80, 2.2)}
  </> },
  /** A chase. Then it comes back the other way, and the roles have swapped. */
  chase: { set: 'street', word: 'WEE-OO!', play: (c) => <>
    <span class="cl-lane a"><span class="cl-hopper">{E(c.p[0]!, 50, 50, 24, { flip: true })}</span></span>
    <span class="cl-lane b"><span class="cl-hopper">{E(c.p[1] ?? '🚓', 50, 50, 24, { flip: true })}</span></span>
    <span class="cl-lane c"><span class="cl-hopper">{E(c.p[1] ?? '🚓', 50, 50, 24)}</span></span>
    <span class="cl-lane d"><span class="cl-hopper">{E(c.p[0]!, 50, 50, 28)}</span></span>
    {dust(30, 84, 0.3)}{dust(70, 84, 1.7)}
    {W(c.word, 30, 22, 0.4, { out: 1.4 })}{W('?!', 66, 24, 1.7, { tone: 'red', rot: 8 })}
    {ME(c, 14, 40, 1.7)}
  </> },
  /** Three, two, one, go. Photo finish. */
  race: { set: 'street', word: 'VROOM!', play: (c) => <>
    <span class="cl-speed" />
    {E('🚦', 50, 22, 16, { a: 'a-drop', c: 'c-out', cd: 1.0 })}
    {W('3', 30, 40, 0.1, { out: 0.4, small: true })}{W('2', 50, 46, 0.4, { out: 0.7, small: true })}{W('1', 70, 40, 0.7, { out: 1.0, small: true })}{W('GO!', 50, 30, 1.0, { out: 1.6, tone: 'red' })}
    <span class="cl-lane fast"><span class="cl-hopper">{E(c.p[0]!, 50, 50, 26, { flip: true })}</span></span>
    <span class="cl-lane slow"><span class="cl-hopper">{E(c.p[1] ?? '🚓', 50, 50, 24, { flip: true })}</span></span>
    {W(c.word, 28, 24, 1.25, { out: 1.9 })}
    {flash(1.85)}
    {E('🏆', 56, 54, 30, { a: 'a-drop', ad: 2.0 })}{E(c.p[0]!, 30, 60, 26, { a: 'a-pop', ad: 2.1, b: 'b-jump' })}
    {sparks(56, 50, 2.2, 6)}
  </> },
  /** Clouds roll in and it rains the thing, until there's a pile. */
  rain: { set: 'sky', word: 'PLOP PLOP PLOP', play: (c) => <>
    {many(18, (i) => <span key={i} class="cl-fall" style={v({ left: `${at(i, 29, 3, 96)}%`, '--d': `${0.4 + at(i, 7, 0, 14) / 10}s`, '--r': `${at(i, 50, 0, 80) - 40}deg` })}>{plain(c.p[i % Math.min(c.p.length, 2)]!)}</span>)}
    {many(9, (i) => E(plain(c.p[i % Math.min(c.p.length, 2)]!), 8 + i * 10.5, 88 - (i % 2) * 6, 14, { a: 'a-pop', ad: 1.0 + i * 0.16 }, `p${i}`))}
    {E('☂️', 50, 52, 28, { a: 'a-pop', ad: 0.2, c: 'c-flipup', cd: 1.9 })}
    {W(c.word, 50, 18, 1.0, { tone: 'dark' })}
    {ME(c, 50, 74, 9, c.good ? 'pleased' : 'annoyed')}
    {W('oh no', 76, 44, 2.1, { small: true, rot: 8 })}
  </> },
  /** One. Aww. Two. Then four thousand. */
  swarm: { set: 'park', word: 'SO MANY', shake: 1.7, play: (c) => <>
    {E(plain(c.p[0]!), 50, 58, 26, { a: 'a-pop', b: 'b-bob', c: 'c-out', cd: 1.0 })}
    {W('aww', 68, 36, 0.25, { out: 0.8, small: true })}
    {E(plain(c.p[0]!), 34, 62, 20, { a: 'a-pop', ad: 0.6, c: 'c-out', cd: 1.0 })}
    {many(30, (i) => <span key={i} class="cl-swarm" style={v({ left: `${at(i, 41, 4, 92)}%`, top: `${20 + at(i, 23, 10, 70)}%`, '--d': `${0.95 + i * 0.035}s`, '--s': `${0.7 + at(i, 3, 0, 6) / 10}` })}>{plain(c.p[i % Math.min(c.p.length, 2)]!)}</span>)}
    <span class="cl-counter"><b>×1</b><b>×2</b><b>×40</b><b>×4,000</b></span>
    {W(c.word, 50, 46, 1.75, { tone: 'red' })}
    {ME(c, 14, 80, 9, 'annoyed')}
  </> },
  /** Countdown, lift-off, a twinkle. Then it comes back down. */
  launch: { set: 'street', word: 'WHOOSH!', shake: 2.45, play: (c) => <>
    {W('3', 26, 30, 0.0, { out: 0.35, small: true })}{W('2', 50, 26, 0.35, { out: 0.7, small: true })}{W('1', 74, 30, 0.7, { out: 1.05, small: true })}
    <span class="cl-rocket">{E(c.p[0]!, 50, 56, 32)}{E('🔥', 50, 80, 20, { b: 'b-flicker', cls: 'cl-flame' })}</span>
    {dust(50, 86, 1.05, 6)}
    {W(c.word, 72, 44, 1.2, { out: 1.9 })}
    {E('✨', 50, 12, 14, { a: 'a-pop', ad: 1.85, c: 'c-out', cd: 2.2 })}
    {E(c.p[0]!, 50, 62, 30, { a: 'a-crash', ad: 2.2, c: 'c-char', cd: 2.45 })}
    {E('💥', 50, 70, 40, { a: 'a-puff', ad: 2.4 })}
    {W('…oh.', 76, 30, 2.6, { small: true, tone: 'dark' })}
    {c.p[1] && E(c.p[1], 82, 76, 18, { a: 'a-pop', ad: 0.2, b: 'b-bob' })}
    {ME(c, 14, 78, 2.5)}
  </> },
  /** Hot off the press. */
  news: { set: 'press', word: 'EXTRA!', play: (c) => <>
    {many(4, (i) => E('🗞️', -10, 30 + i * 14, 16, { a: 'a-conveyor', ad: i * 0.18 }, `n${i}`))}
    <span class="cl-paper"><b>THE BUGLE</b><em>{c.label.toUpperCase()}</em><span class="cl-photo">{E(c.p[0]!, 36, 54, 20)}{c.p[1] && E(c.p[1], 66, 54, 20)}</span><i /><i /></span>
    {flash(1.5)}{flash(1.85)}
    {E('📸', 14, 30, 16, { a: 'a-pop', ad: 1.3, b: 'b-wob' })}{E('📸', 86, 34, 16, { a: 'a-pop', ad: 1.6, b: 'b-wob', flip: true })}
    {W(c.word, 80, 16, 1.6, { tone: 'red', rot: 10 })}
    {ME(c, 12, 82, 2.0)}
  </> },
  /** A wand, a swirl, a puff of smoke. Something else is standing there. */
  morph: { set: 'stage', word: 'POOF!', shake: 1.15, play: (c) => <>
    <span class="cl-beam" />
    {E(c.p[0]!, 50, 58, 32, { a: 'a-pop', b: 'b-rattle', bd: 0.5, c: 'c-out', cd: 1.1 })}
    {E('🪄', 76, 34, 20, { a: 'a-inR', ad: 0.1, b: 'b-wob' })}
    {many(7, (i) => <span key={i} class="cl-orbit" style={v({ '--d': `${0.3 + i * 0.1}s`, '--a': `${i * 51}deg` })}>✨</span>)}
    {E('💨', 50, 56, 44, { a: 'a-puff', ad: 1.05 })}
    {E(c.p[1] ?? '✨', 50, 58, 34, { a: 'a-spinin', ad: 1.25, b: 'b-jump', bd: 0.8 })}
    {W(c.word, 28, 24, 1.15)}
    {E(c.p[0]!, 82, 82, 11, { a: 'a-pop', ad: 2.1, b: 'b-wob' })}{W('hello?', 82, 68, 2.3, { small: true, rot: 6 })}
    {ME(c, 14, 78, 1.4)}
  </> },
  /** Tiptoe in. Look left. Look right. Gone. */
  steal: { set: 'office', word: 'YOINK!', play: (c) => <>
    <span class="cl-night" />
    {E(c.p[0]!, 44, 58, 28, { a: 'a-pop', c: 'c-yoink', cd: 1.55 })}
    <span class="cl-thief"><span class="b-tiptoe"><span class="cl-look">{E(c.p[1] ?? '@randy', 50, 50, 28)}</span></span></span>
    {E('👀', 70, 28, 12, { a: 'a-pop', ad: 1.0, c: 'c-out', cd: 1.5 })}
    {W('shh', 78, 46, 0.5, { out: 1.2, small: true })}
    {W(c.word, 40, 26, 1.6, { tone: 'red' })}
    {dust(40, 70, 1.75, 5)}
    <span class="cl-outline" />
    {E('❓', 44, 52, 16, { a: 'a-pop', ad: 2.2, b: 'b-wob' })}
    {ME(c, 86, 80, 2.3)}
  </> },
  /** A spotlight, a crowd, flowers thrown at the stage. */
  cheer: { set: 'stage', word: 'YAAAY!', play: (c) => <>
    <span class="cl-beam sweep" /><span class="cl-podium" />
    {E(c.p[0]!, 50, 40, 30, { a: 'a-drop', b: 'b-jump' })}
    {many(5, (i) => E('💐', 14 + i * 18, 100, 12, { a: 'a-toss', ad: 1.1 + i * 0.2 }, `f${i}`))}
    {confetti(0.8, 18)}
    {W(c.word, 24, 22, 0.8)}{W('MORE!', 80, 30, 1.9, { small: true, rot: 8 })}
    <span class="cl-crowd">{many(9, (i) => <span key={i} style={v({ '--d': `${i * 0.07}s` })}>{['🙌', '👏', '😀'][i % 3]}</span>)}</span>
  </> },
  /** Same stage. Tomatoes. A shoe. */
  boo: { set: 'stage', word: 'BOOO!', shake: 0.9, play: (c) => <>
    <span class="cl-beam" /><span class="cl-podium" />
    {E(c.p[0]!, 50, 40, 30, { a: 'a-drop', b: 'b-flinch', bd: 0.7 })}
    {many(6, (i) => <span key={i} class="cl-tomato" style={v({ '--d': `${0.6 + i * 0.22}s`, '--y': `${at(i, 17, 0, 24) - 12}cqh`, '--from': i % 2 ? '60cqw' : '-60cqw' })}>🍅</span>)}
    {many(5, (i) => <i key={i} class="cl-splat" style={v({ left: `${40 + at(i, 9, 0, 20)}%`, top: `${28 + at(i, 13, 0, 24)}%`, '--d': `${0.95 + i * 0.22}s` })} />)}
    {E('👟', 50, 100, 14, { a: 'a-toss', ad: 2.1 })}
    {W(c.word, 24, 22, 0.6, { tone: 'red' })}{W('GET OFF', 80, 30, 1.6, { small: true, rot: 8, tone: 'dark' })}
    <span class="cl-crowd">{many(9, (i) => <span key={i} style={v({ '--d': `${i * 0.07}s` })}>{['😠', '👎', '😤'][i % 3]}</span>)}</span>
  </> },
  /** The needle buzzes. One piece at a time. Fresh ink. */
  ink: { set: 'office', word: 'FRESH INK', play: (c) => <>
    <span class="cl-arm"><span class="cl-tattoo">{c.p.map((g, i) => <span key={i} class="cl-inked" style={v({ '--d': `${0.6 + i * 0.5}s`, '--s': `${1 - i * 0.24}` })}>{plain(g)}</span>)}</span><span class="cl-shine" /></span>
    {E('✒️', 80, 30, 18, { a: 'a-pop', ad: 0.2, b: 'b-buzz', c: 'c-out', cd: 2.0 })}
    {W('BZZZT', 78, 16, 0.5, { out: 1.2, small: true })}{W('ow', 22, 22, 0.9, { out: 1.4, small: true, rot: 8 })}{W('BZZT', 70, 80, 1.4, { out: 2.0, small: true })}
    {sparks(46, 54, 2.1, 8)}{W(c.word, 50, 16, 2.15)}
    {ME(c, 88, 82, 2.2, 'pleased')}
  </> },
  /** Nom. Nom. Nom. Burp. */
  eat: { set: 'office', word: 'BURP.', shake: 2.25, play: (c) => <>
    {E(c.p[0]!, 66, 58, 28, { a: 'a-pop', c: 'c-eaten', cd: 0.5 })}
    {E(c.p[1] ?? '@randy', 32, 56, 30, { a: 'a-inL', b: 'b-chomp', bd: 0.4, mood: 'pleased' })}
    {W('NOM', 56, 30, 0.55, { out: 0.95, small: true })}{W('NOM', 70, 36, 1.0, { out: 1.4, small: true, rot: 8 })}{W('NOM', 50, 26, 1.45, { out: 1.9, small: true })}
    {many(8, (i) => <i key={i} class="cl-crumb" style={v({ '--d': `${0.5 + i * 0.16}s`, '--y': `${at(i, 13, 0, 30) - 15}cqh` })} />)}
    {E('🍽️', 66, 62, 22, { a: 'a-pop', ad: 2.0 })}
    {W(c.word, 40, 24, 2.25, { tone: 'dark' })}
    {ME(c, 88, 80, 2.3)}
  </> },
  /** Order. ORDER. The verdict arrives. */
  court: { set: 'court', word: 'CASE CLOSED', shake: 0.55, play: (c) => <>
    {E(c.p[0]!, 50, 34, 30, { a: 'a-pop', b: 'b-bob' })}
    {E('🔨', 74, 40, 20, { a: 'a-pop', ad: 0.2, b: 'b-gavel' })}
    {many(3, (i) => E('💥', 70, 56, 14, { a: 'a-puff', ad: 0.55 + i * 0.4 }, `g${i}`))}
    {W('ORDER!', 26, 20, 0.55, { out: 1.6, tone: 'red' })}
    {c.p[1] && E(c.p[1], 22, 76, 22, { a: 'a-pop', ad: 0.3, b: 'b-flinch', bd: 0.5 })}
    {E('📜', 50, 70, 22, { a: 'a-drop', ad: 1.7 })}
    {W(c.word, 62, 82, 2.05, { tone: 'dark', rot: -4 })}
    {ME(c, 88, 78, 2.1)}
  </> },
  /** They run to each other. Hearts. A rainbow, for some reason. */
  love: { set: 'park', word: 'AWW.', play: (c) => <>
    {E('🌈', 50, 44, 70, { a: 'a-risefade', ad: 1.3 })}
    {E(c.p[0]!, 34, 60, 28, { a: 'a-inLslow', b: 'b-sway', bd: 0.9 })}
    {E(c.p[1] ?? '❤️', 66, 60, 28, { a: 'a-inRslow', b: 'b-sway', bd: 1.0, flip: true })}
    {sparks(50, 54, 1.0, 8, '❤️')}
    {many(7, (i) => E('❤️', 36 + at(i, 11, 0, 30), 60, 9, { a: 'a-heart', ad: 1.2 + i * 0.16 }, `h${i}`))}
    {W(c.word, 50, 20, 1.2)}
    {E('🕊️', -10, 26, 14, { a: 'a-flyacross', ad: 1.8 })}
    {ME(c, 12, 82, 1.4)}
  </> },
  /** It's broken. CLANG. CLUNK. It's fixed. Ish. */
  fix: { set: 'street', word: 'FIXED-ISH', play: (c) => <>
    {E(c.p[0]!, 50, 60, 32, { a: 'a-pop', b: 'b-broken', c: 'c-mend', cd: 1.6 })}
    {E('💨', 60, 36, 14, { a: 'a-puff', ad: 0.2 })}{E('💨', 44, 34, 12, { a: 'a-puff', ad: 0.6 })}
    {E('🔧', 28, 44, 18, { a: 'a-inL', ad: 0.4, b: 'b-hammer', c: 'c-out', cd: 1.6 })}{E('🔨', 72, 44, 18, { a: 'a-inR', ad: 0.6, b: 'b-hammer', c: 'c-out', cd: 1.6, flip: true })}
    {W('CLANG', 24, 22, 0.7, { out: 1.2, small: true })}{W('CLUNK', 76, 24, 1.1, { out: 1.6, small: true, rot: 8 })}
    {sparks(50, 56, 0.9, 5, '⚡')}{sparks(50, 56, 1.7, 8)}
    {E('🩹', 58, 54, 12, { a: 'a-pop', ad: 1.7 })}
    {W(c.word, 50, 20, 1.8)}{E('👍', 80, 76, 16, { a: 'a-pop', ad: 2.1, b: 'b-jump' })}
    {ME(c, 14, 78, 1.9)}
  </> },
  /** The water rises. Things float past. A fish. */
  flood: { set: 'office', word: 'GLUG GLUG', play: (c) => <>
    <span class="cl-water"><span class="cl-wave" /></span>
    {E(c.p[0]!, 40, 62, 26, { a: 'a-floatup', b: 'b-bob' })}
    {c.p[1] && E(c.p[1], 70, 66, 20, { a: 'a-floatup', ad: 0.3, b: 'b-bob', bd: 0.3 })}
    {E('🪑', 0, 70, 14, { a: 'a-drift', ad: 0.8 })}{E('📎', 0, 80, 9, { a: 'a-drift', ad: 1.3 })}
    {E('🐟', 60, 80, 14, { a: 'a-leap', ad: 1.8 })}{E('💦', 66, 70, 10, { a: 'a-puff', ad: 2.3 })}
    {W(c.word, 62, 20, 1.0, { tone: 'dark' })}
    {ME(c, 14, 60, 9, 'annoyed')}
  </> },
  /** The fuse burns down. */
  boom: { set: 'street', word: 'BOOM!', shake: 1.0, play: (c) => <>
    {E(c.p[0]!, 40, 60, 28, { a: 'a-pop', b: 'b-rattle', c: 'c-out', cd: 1.0 })}
    {E('💣', 64, 64, 22, { a: 'a-pop', c: 'c-out', cd: 1.0 })}<span class="cl-fuse" />
    {W('uh oh', 30, 26, 0.4, { out: 0.95, small: true })}
    {flash(1.0)}{E('💥', 50, 56, 70, { a: 'a-puff', ad: 1.0 })}
    {sparks(50, 56, 1.05, 10, plain(c.p[1] ?? '💨'))}
    {W(c.word, 50, 26, 1.05, { tone: 'red' })}
    {many(3, (i) => E('☁️', 36 + i * 14, 50, 22, { a: 'a-flyup', ad: 1.3 + i * 0.12 }, `s${i}`))}
    {E(c.p[0]!, 40, 62, 26, { a: 'a-crash', ad: 1.9, c: 'c-char', cd: 1.9 })}
    {W('…oops.', 70, 36, 2.3, { small: true, tone: 'dark', rot: 6 })}
    {ME(c, 14, 78, 9, 'annoyed')}
  </> },
  /** Curtain up. */
  show: { set: 'stage', word: 'TA-DA!', play: (c) => <>
    <span class="cl-beam" />
    {E(c.p[0]!, 50, 56, 34, { b: 'b-bob' })}
    {c.p[1] && E(c.p[1], 76, 70, 20, { a: 'a-pop', ad: 1.4, b: 'b-jump' })}
    {c.p[2] && E(c.p[2], 26, 72, 18, { a: 'a-pop', ad: 1.7, b: 'b-wob' })}
    <span class="cl-curtain l" /><span class="cl-curtain r" />
    {W('ba-dum', 50, 50, 0.1, { out: 0.5, small: true })}
    {sparks(50, 52, 1.05)}{W(c.word, 30, 22, 1.05)}
    {many(3, (i) => E('🌹', 20 + i * 30, 100, 12, { a: 'a-toss', ad: 1.8 + i * 0.18 }, `r${i}`))}
    {ME(c, 12, 82, 1.2)}
  </> },
};

export const ACT_NAMES = Object.keys(ACTS);
const SOUR = new Set(['deny', 'sulk', 'boo', 'boom']);

export function ClipStage({ clip, label, who, good }: { clip: Clip; label: string; who: string; good: boolean }) {
  const act = ACTS[clip.act] ?? ACTS.show!;
  const p = clip.props.length ? clip.props : ['❓'];
  return (
    <div class={`clip clip-${clip.act}`} aria-hidden="true">
      <div class="cl-cam" style={v({ '--shake': `${act.shake ?? 99}s` })}>
        <Backdrop name={act.set} />
        {act.play({ p, me: who, word: clip.word ?? act.word, label, good: good && !SOUR.has(clip.act) })}
      </div>
    </div>
  );
}
