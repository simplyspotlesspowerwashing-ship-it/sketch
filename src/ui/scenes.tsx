// Scenes: the 5–7 second film after a choice, acted by the cast on a drawn set with drawn props.
// A scene is a script: a set name, then one line per beat (about a second each). Commands in a beat
// are separated by ";" and happen together.
//
//   who@40            put a character at x=40 (0..100)        who@40:cheer   ...in a pose
//   who>70            walk to x=70 (>-20 or >120 walks off)   who:angry      change pose
//   who=key           pick up / be handed the prop "key"      who=           put it down
//   who"Honk."        speech bubble for this beat
//   +pond@50,90*1.4   add a prop (x, y of its base, size)     +pond#p2@..    with its own id
//       ...ends with  v drop in   ^ rise up   < from the right   > from the left   (default: pop)
//   -pond             remove with a puff      -pond!   squash flat
//   pond~bin          turn one prop into another               pond>30,90     move a prop
//   *12 gosling@50,92 scatter twelve
//   sign"CLOSED"@70,60  a sign with words on it               !"HONK!"@50,30  a sound word
//   fx:name@x,y       splash boom sparkle hearts anger dust zzz confetti notes coins coinsout
//                     flash rain stampNO stampOK water fog clear fireworks shake
//   crowd:cheer | crowd:protest | crowd:none
import type { ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { INK, drawCast } from './art.tsx';
import type { Mood } from './art.tsx';
import { PROPS } from './props.tsx';

const W = 400, GROUND = 272, SIZE = 0.98; // characters stand about half the height of the stage
const px = (x: number) => (x / 100) * W;
const py = (y: number) => (y / 100) * 300;

// ---------- full-body characters ----------
type Pose = 'stand' | 'cheer' | 'angry' | 'sad' | 'shock' | 'point' | 'carry' | 'wave' | 'sleep' | 'think';
const BODY: Record<string, { top: string; skin: string; legs: string; shoe: string; thin?: boolean }> = {
  pam: { top: '#D9653B', skin: '#F0C4A0', legs: '#4A4038', shoe: INK }, chad: { top: '#3F8F5A', skin: '#E2A878', legs: '#F2EBDD', shoe: '#8A5A3C' },
  barb: { top: '#3B6FB6', skin: '#B9794E', legs: '#27497A', shoe: INK }, marge: { top: '#B0892A', skin: '#F3D3BC', legs: '#6B6257', shoe: INK },
  linda: { top: '#7A5C9C', skin: '#8A5A3C', legs: '#3A322C', shoe: INK }, doug: { top: '#8C8577', skin: '#F0C9A8', legs: '#4A4038', shoe: INK },
  steve: { top: '#E8C55A', skin: '#F0C4A0', legs: '#3B6FB6', shoe: INK }, timmy: { top: '#D9653B', skin: '#F5CFAE', legs: '#3B6FB6', shoe: '#C23B3B' },
  stranger: { top: '#4A4038', skin: '#3A322C', legs: '#29231F', shoe: INK }, gerald: { top: '#FFFFFF', skin: '#FFFFFF', legs: '#E8943A', shoe: '#E8943A', thin: true },
  randy: { top: '#C8A26A', skin: '#B8B1A4', legs: '#8C8577', shoe: '#3A322C' }, bev: { top: '#E79AB0', skin: '#F3D3BC', legs: '#7A5C9C', shoe: INK },
  brayden: { top: '#7A5C9C', skin: '#E2A878', legs: '#3A322C', shoe: '#fff' }, nora: { top: '#F2F0EC', skin: '#C68C5E', legs: '#4A4038', shoe: INK },
  whiskers: { top: '#3A322C', skin: '#E8943A', legs: '#3A322C', shoe: '#E8943A' }, marcel: { top: '#F2F0EC', skin: '#FBFBF8', legs: '#29231F', shoe: INK },
  sal: { top: '#F2F0EC', skin: '#D9A27A', legs: '#3A322C', shoe: INK }, coach: { top: '#C23B3B', skin: '#F0C4A0', legs: '#C23B3B', shoe: '#fff' },
  sheila: { top: '#4A3A7A', skin: '#B9794E', legs: '#4A3A7A', shoe: '#E8C55A' }, mayor: { top: '#5B4B8A', skin: '#E9B98F', legs: '#3A322C', shoe: INK },
};
/** Arm angles in degrees away from hanging straight down: [back arm, front arm]. */
const ARMS: Record<Pose, [number, number]> = { stand: [10, 10], cheer: [155, 155], angry: [48, 48], sad: [4, 4], shock: [115, 115], point: [10, 92], carry: [72, 72], wave: [10, 150], sleep: [20, 20], think: [10, 130] };
const MOOD: Record<Pose, Mood> = { stand: 'neutral', cheer: 'pleased', angry: 'annoyed', sad: 'annoyed', shock: 'annoyed', point: 'neutral', carry: 'neutral', wave: 'pleased', sleep: 'neutral', think: 'neutral' };

function Limb({ x, y, len, angle, color, end, w = 9 }: { x: number; y: number; len: number; angle: number; color: string; end: string; w?: number }) {
  return (
    <g class="sc-limb" style={{ transform: `translate(${x}px, ${y}px) rotate(${-angle}deg)` }}>
      <path d={`M0 0 v${len}`} stroke={INK} stroke-width={w + 4} stroke-linecap="round" /><path d={`M0 0 v${len}`} stroke={color} stroke-width={w} stroke-linecap="round" />
      <circle cx="0" cy={len} r={w * 0.62} fill={end} stroke={INK} stroke-width="2" />
    </g>
  );
}
/** A character standing on (0,0), about 150 tall, facing right. */
export function Puppet({ who, pose, walking }: { who: string; pose: Pose; walking?: boolean }) {
  const b = BODY[who] ?? BODY.doug!;
  const [back, front] = ARMS[pose];
  return (
    <g class={`sc-puppet pose-${pose} ${walking ? 'walking' : ''}`}>
      <g class="sc-leg a"><Limb x={-10} y={-36} len={34} angle={0} color={b.legs} end={b.shoe} w={b.thin ? 4 : 9} /></g>
      <g class="sc-leg b"><Limb x={10} y={-36} len={34} angle={0} color={b.legs} end={b.shoe} w={b.thin ? 4 : 9} /></g>
      <g class="sc-body">
        <Limb x={-21} y={-80} len={30} angle={-back} color={b.top} end={b.skin} />
        <rect x="-24" y="-86" width="48" height="56" rx="14" fill={b.top} stroke={INK} stroke-width="3" />
        <g class="sc-head" transform="translate(-36 -154) scale(.72)">{drawCast(who, MOOD[pose])}</g>
        <g class={pose === 'wave' ? 'sc-waving' : ''}><Limb x={21} y={-80} len={30} angle={front} color={b.top} end={b.skin} /></g>
      </g>
    </g>
  );
}

// ---------- the script ----------
interface Actor { id: string; x: number; pose: Pose; flip: boolean; movedAt: number; bornAt: number; holding?: string }
interface Thing { id: string; name: string; x: number; y: number; s: number; enter: string; bornAt: number; gone?: 'poof' | 'squash'; goneAt?: number; text?: string; changedAt?: number }
interface Fx { key: string; name: string; x: number; y: number; at: number; text?: string }
interface World { actors: Actor[]; things: Thing[]; fx: Fx[]; bubbles: { who: string; text: string; at: number }[]; crowd: string; water: boolean; fog: boolean; rain: boolean }
export interface Scene { set: string; beats: string[][] }

export function parseScene(src: string): Scene {
  const lines = src.split('\n').map((l) => l.trim()).filter(Boolean);
  return { set: lines[0] ?? 'office', beats: lines.slice(1).map((l) => l.split(';').map((c) => c.trim()).filter(Boolean)) };
}

function play(scene: Scene, upTo: number): World {
  const w: World = { actors: [], things: [], fx: [], bubbles: [], crowd: 'none', water: false, fog: false, rain: false };
  const actor = (id: string) => w.actors.find((a) => a.id === id);
  const thing = (id: string) => w.things.find((t) => t.id === id && !t.gone);
  scene.beats.slice(0, upTo + 1).forEach((beat, at) => {
    for (const c of beat) {
      let m: RegExpMatchArray | null;
      if ((m = c.match(/^\*(\d+) (\w+)@(-?\d+),(-?\d+)(?:\*([\d.]+))?$/))) {
        const n = Number(m[1]);
        for (let i = 0; i < n; i++) w.things.push({ id: `${m[2]}${at}_${i}`, name: m[2]!, x: Number(m[3]) + ((i * 37) % 60) - 30, y: Number(m[4]) - ((i * 23) % 22), s: Number(m[5] ?? 0.45) * (0.8 + ((i * 7) % 5) / 10), enter: `pop d${i % 8}`, bornAt: at });
      } else if ((m = c.match(/^sign"([^"]*)"(?:#(\w+))?@(-?\d+),(-?\d+)(?:\*([\d.]+))?$/))) {
        const old = w.things.find((t) => t.id === (m![2] ?? 'sign') && !t.gone); if (old) { old.gone = 'poof'; old.goneAt = at; }
        w.things.push({ id: m[2] ?? 'sign', name: 'sign', text: m[1], x: Number(m[3]), y: Number(m[4]), s: Number(m[5] ?? 1), enter: 'pop', bornAt: at });
      } else if ((m = c.match(/^!"([^"]*)"@(-?\d+),(-?\d+)$/))) w.fx.push({ key: `w${at}${m[1]}`, name: 'word', text: m[1], x: Number(m[2]), y: Number(m[3]), at });
      else if ((m = c.match(/^fx:(\w+)(?:@(-?\d+),(-?\d+))?$/))) {
        if (m[1] === 'water') w.water = true; else if (m[1] === 'fog') w.fog = true; else if (m[1] === 'rain') w.rain = true; else if (m[1] === 'clear') { w.fog = false; w.rain = false; w.water = false; }
        w.fx.push({ key: `f${at}${m[1]}${m[2] ?? ''}`, name: m[1]!, x: Number(m[2] ?? 50), y: Number(m[3] ?? 50), at });
      } else if ((m = c.match(/^crowd:(\w+)$/))) w.crowd = m[1]!;
      else if ((m = c.match(/^\+(\w+)(?:#(\w+))?@(-?\d+),(-?\d+)(?:\*([\d.]+))?([v^<>])?$/))) w.things.push({ id: m[2] ?? m[1]!, name: m[1]!, x: Number(m[3]), y: Number(m[4]), s: Number(m[5] ?? 1), enter: { v: 'drop', '^': 'rise', '<': 'inR', '>': 'inL' }[m[6] ?? ''] ?? 'pop', bornAt: at });
      else if ((m = c.match(/^-(\w+)(!)?$/))) { const t = thing(m[1]!); if (t) { t.gone = m[2] ? 'squash' : 'poof'; t.goneAt = at; } }
      else if ((m = c.match(/^(\w+)~(\w+)$/))) { const t = thing(m[1]!); if (t) { t.name = m[2]!; t.changedAt = at; } }
      else if ((m = c.match(/^(\w+)>(-?\d+),(-?\d+)$/))) { const t = thing(m[1]!); if (t) { t.x = Number(m[2]); t.y = Number(m[3]); } }
      else if ((m = c.match(/^(\w+)@(-?\d+)(?::(\w+))?$/))) w.actors.push({ id: m[1]!, x: Number(m[2]), pose: (m[3] as Pose) ?? 'stand', flip: Number(m[2]) > 50, movedAt: -1, bornAt: at });
      else if ((m = c.match(/^(\w+)>(-?\d+)$/))) { const a = actor(m[1]!); if (a) { a.flip = Number(m[2]) < a.x; a.x = Number(m[2]); a.movedAt = at; } }
      else if ((m = c.match(/^(\w+):(\w+)$/))) { const a = actor(m[1]!); if (a) { if (m[2] === 'turn') a.flip = !a.flip; else a.pose = m[2] as Pose; } }
      else if ((m = c.match(/^(\w+)=(\w*)$/))) {
        const a = actor(m[1]!); if (!a) continue;
        if (a.holding && !m[2]) { const t = thing(a.holding); if (t) { t.x = a.x + (a.flip ? -8 : 8); t.y = 89; } }
        for (const o of w.actors) if (o.holding === m[2]) o.holding = undefined;
        a.holding = m[2] || undefined; if (m[2] && a.pose === 'stand') a.pose = 'carry'; if (!m[2] && a.pose === 'carry') a.pose = 'stand';
      } else if ((m = c.match(/^(\w+)"([^"]*)"$/))) w.bubbles.push({ who: m[1]!, text: m[2]!, at });
    }
  });
  return w;
}

/** Check a script before it ships: every prop exists and every command parses. Returns problems. */
export function lintScene(src: string): string[] {
  const s = parseScene(src); const bad: string[] = [];
  const known = /^(\*\d+ \w+@-?\d+,-?\d+(\*[\d.]+)?|sign"[^"]*"(#\w+)?@-?\d+,-?\d+(\*[\d.]+)?|!"[^"]*"@-?\d+,-?\d+|fx:\w+(@-?\d+,-?\d+)?|crowd:\w+|\+\w+(#\w+)?@-?\d+,-?\d+(\*[\d.]+)?[v^<>]?|-\w+!?|\w+~\w+|\w+>-?\d+,-?\d+|\w+@-?\d+(:\w+)?|\w+>-?\d+|\w+:\w+|\w+=\w*|\w+"[^"]*")$/;
  for (const beat of s.beats) for (const c of beat) {
    if (!known.test(c)) bad.push(`cannot read "${c}"`);
    const p = c.match(/^\+(\w+)/) ?? c.match(/^\*\d+ (\w+)/) ?? c.match(/^\w+~(\w+)$/);
    if (p && !PROPS[p[1]!]) bad.push(`no prop called "${p[1]}"`);
    const a = c.match(/^(\w+)@-?\d+(:\w+)?$/); if (a && !BODY[a[1]!]) bad.push(`no character called "${a[1]}"`);
  }
  if (s.beats.length < 4 || s.beats.length > 8) bad.push(`${s.beats.length} beats (want 5 to 7)`);
  return bad;
}

// ---------- sets ----------
const S = { stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' as const };
const SETS: Record<string, ComponentChildren> = {
  office: <>
    <rect width="400" height="300" fill="#EFE2C4" /><rect y="214" width="400" height="86" fill="#C9A77A" {...S} />
    <rect x="286" y="30" width="86" height="84" rx="4" fill="#BFDDF0" {...S} /><path d="M329 30 v84 M286 72 h86" stroke={INK} stroke-width="2.5" />
    <rect x="30" y="34" width="52" height="66" rx="3" fill="#FBF7EE" {...S} /><circle cx="56" cy="60" r="13" fill="#D9CDB6" {...S} /><path d="M40 92 q16 -20 32 0" fill="#D9CDB6" {...S} />
    <path d="M160 30 h80 v28 h-80z" fill="#5B4B8A" {...S} /><text x="200" y="50" text-anchor="middle" font-size="15" font-weight="700" fill="#FBF7EE" font-family="Fredoka, sans-serif">MAYOR</text>
  </>,
  street: <>
    <rect width="400" height="300" fill="#BFDDF0" /><circle cx="346" cy="44" r="22" fill="#F7D774" {...S} />
    <rect x="10" y="96" width="86" height="126" fill="#D9653B" {...S} /><rect x="108" y="66" width="72" height="156" fill="#E6DBC6" {...S} /><rect x="232" y="84" width="80" height="138" fill="#B0892A" {...S} /><rect x="324" y="112" width="68" height="110" fill="#3F8F5A" {...S} />
    {[[24, 112], [60, 112], [24, 152], [60, 152], [120, 84], [150, 84], [120, 124], [150, 124], [246, 100], [282, 100], [246, 140], [282, 140], [336, 128], [364, 128]].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="20" height="22" fill="#FBF7EE" {...S} stroke-width="2" />)}
    <rect y="222" width="400" height="78" fill="#6B6257" {...S} /><path d="M10 286 h380" stroke="#F2EBDD" stroke-width="5" stroke-dasharray="34 24" />
  </>,
  park: <>
    <rect width="400" height="300" fill="#CFE8F3" /><circle cx="60" cy="46" r="22" fill="#F7D774" {...S} />
    <path d="M0 200 q90 -50 190 -18 q100 -40 210 8 v110 h-400z" fill="#9DBF8A" {...S} />
    <path d="M300 50 q-10 0 -9 -8 q1 -7 9 -6 q4 -8 13 -5 q8 3 6 11 q6 2 3 8z" fill="#fff" opacity=".9" />
  </>,
  school: <>
    <rect width="400" height="300" fill="#F3E3C8" /><rect y="214" width="400" height="86" fill="#B58D55" {...S} />
    <rect x="60" y="30" width="280" height="110" rx="4" fill="#3F6B55" {...S} stroke-width="6" stroke="#8A5A3C" /><path d="M80 60 h90 M80 82 h60 M230 70 q20 -20 40 0 q20 20 40 0" stroke="#F2EBDD" stroke-width="3" fill="none" stroke-linecap="round" />
  </>,
  library: <>
    <rect width="400" height="300" fill="#E9DCC0" /><rect y="214" width="400" height="86" fill="#B58D55" {...S} />
    {[0, 1, 2].map((r) => <g key={r}><rect x="12" y={22 + r * 62} width="376" height="54" fill="#8A5A3C" {...S} />{Array.from({ length: 22 }, (_, i) => <rect key={i} x={20 + i * 16.6} y={28 + r * 62 + ((i * 7 + r) % 3) * 3} width="12" height={44 - ((i * 7 + r) % 3) * 3} fill={['#C23B3B', '#3B6FB6', '#3F8F5A', '#E8C55A', '#7A5C9C'][(i + r) % 5]} stroke={INK} stroke-width="1.5" />)}</g>)}
  </>,
  studio: <>
    <rect width="400" height="300" fill="#3B4A6B" /><rect y="214" width="400" height="86" fill="#27304A" {...S} />
    <rect x="90" y="24" width="220" height="140" rx="6" fill="#BFDDF0" {...S} stroke-width="5" /><path d="M110 120 q40 -50 80 -10 q30 -40 100 0" stroke="#3F8F5A" stroke-width="4" fill="none" />
    <circle cx="150" cy="60" r="12" fill="#F7D774" {...S} /><path d="M230 60 q-10 0 -9 -8 q1 -7 9 -6 q4 -8 13 -5 q8 3 6 11 q6 2 3 8z" fill="#fff" {...S} stroke-width="2" />
  </>,
  court: <>
    <rect width="400" height="300" fill="#C9A77A" />{[0, 80, 160, 240, 320].map((x) => <rect key={x} x={x + 6} y="14" width="68" height="150" rx="4" fill="#B58D55" {...S} stroke-width="2" />)}
    <rect y="214" width="400" height="86" fill="#8A5A3C" {...S} />
  </>,
};

// ---------- drawing a moment ----------
function Sign({ text }: { text: string }) {
  const w = Math.max(56, text.length * 9.5 + 18);
  return <g><path d="M50 100 v-40" stroke={INK} stroke-width="5" /><rect x={50 - w / 2} y="18" width={w} height="40" rx="5" fill="#FBF7EE" stroke={INK} stroke-width="3" /><text x="50" y="45" text-anchor="middle" font-size="17" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">{text}</text></g>;
}
function Effect({ f }: { f: Fx }) {
  const x = px(f.x), y = py(f.y);
  const ring = (n: number, body: (i: number) => ComponentChildren) => Array.from({ length: n }, (_, i) => <g key={i} class="sc-burst" style={{ '--a': `${(i * 360) / n}deg` } as Record<string, string>}>{body(i)}</g>);
  switch (f.name) {
    case 'word': return <g class="sc-word" style={{ transform: `translate(${x}px, ${y}px)` }}><g><rect x={-(f.text!.length * 7 + 12)} y="-20" width={f.text!.length * 14 + 24} height="36" rx="8" fill="#E8C55A" stroke={INK} stroke-width="3.5" /><text y="6" text-anchor="middle" font-size="22" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">{f.text}</text></g></g>;
    case 'splash': return <g transform={`translate(${x} ${y})`}>{ring(9, () => <path d="M0 -6 q5 -10 0 -18 q-5 8 0 18z" fill="#7FB7D9" stroke={INK} stroke-width="1.5" />)}</g>;
    case 'sparkle': return <g transform={`translate(${x} ${y})`}>{ring(8, () => <path d="M0 -8 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3z" fill="#F7D774" stroke={INK} stroke-width="1.2" transform="translate(-3 -8) scale(.8)" />)}</g>;
    case 'boom': return <g transform={`translate(${x} ${y})`}><g class="sc-boom"><path d="M0 -46 l12 22 l26 -10 l-8 26 l26 10 l-24 10 l10 26 l-26 -8 l-10 24 l-12 -22 l-24 12 l6 -26 l-26 -8 l22 -14 l-12 -24 l26 6z" fill="#F7D774" stroke={INK} stroke-width="3" /><path d="M0 -24 l7 12 l14 -5 l-4 14 l14 6 l-13 6 l5 14 l-14 -4 l-6 13 l-7 -12 l-13 6 l3 -14 l-14 -4 l12 -8 l-6 -13 l14 3z" fill="#E8943A" /></g></g>;
    case 'hearts': return <g transform={`translate(${x} ${y})`}>{[0, 1, 2, 3, 4].map((i) => <path key={i} class="sc-float" style={{ '--d': `${i * 0.14}s`, '--x': `${(i - 2) * 12}px` } as Record<string, string>} d="M0 6 q-10 -7 -10 -13 q0 -6 5 -6 q3 0 5 4 q2 -4 5 -4 q5 0 5 6 q0 6 -10 13z" fill="#D9653B" stroke={INK} stroke-width="1.5" />)}</g>;
    case 'anger': return <g transform={`translate(${x} ${y})`}><g class="sc-pulse"><path d="M-10 -10 q10 4 4 -8 M10 -10 q-10 4 -4 -8 M-10 10 q10 -4 4 8 M10 10 q-10 -4 -4 8" stroke="#C23B3B" stroke-width="4.5" fill="none" stroke-linecap="round" /></g></g>;
    case 'dust': return <g transform={`translate(${x} ${y})`}>{[0, 1, 2, 3].map((i) => <circle key={i} class="sc-puff" style={{ '--d': `${i * 0.06}s`, '--x': `${(i - 1.5) * 16}px` } as Record<string, string>} r="10" fill="#fff" stroke={INK} stroke-width="1.5" />)}</g>;
    case 'poof': return <g transform={`translate(${x} ${y})`}>{[0, 1, 2, 3, 4].map((i) => <circle key={i} class="sc-puff" style={{ '--d': `${i * 0.04}s`, '--x': `${(i - 2) * 14}px` } as Record<string, string>} r="14" fill="#fff" stroke={INK} stroke-width="1.5" />)}</g>;
    case 'zzz': return <g transform={`translate(${x} ${y})`}>{['z', 'Z', 'Z'].map((t, i) => <text key={i} class="sc-float" style={{ '--d': `${i * 0.3}s`, '--x': `${i * 8}px` } as Record<string, string>} font-size={14 + i * 5} font-weight="700" fill={INK} font-family="Fredoka, sans-serif">{t}</text>)}</g>;
    case 'notes': return <g transform={`translate(${x} ${y})`}>{[0, 1, 2].map((i) => <path key={i} class="sc-float" style={{ '--d': `${i * 0.25}s`, '--x': `${(i - 1) * 16}px` } as Record<string, string>} d="M0 0 v-18 l10 -3 v15" stroke={INK} stroke-width="3" fill="none" />)}</g>;
    case 'coins': return <g transform={`translate(${x} ${y})`}>{Array.from({ length: 9 }, (_, i) => <g key={i} class="sc-coinin" style={{ '--d': `${i * 0.08}s`, '--x': `${((i * 37) % 80) - 40}px` } as Record<string, string>}><circle r="8" fill="#E8C55A" stroke={INK} stroke-width="2" /><path d="M0 -4 v8" stroke={INK} stroke-width="1.5" /></g>)}</g>;
    case 'coinsout': return <g transform={`translate(${x} ${y})`}>{Array.from({ length: 9 }, (_, i) => <g key={i} class="sc-coinout" style={{ '--d': `${i * 0.08}s`, '--x': `${((i * 37) % 140) - 70}px` } as Record<string, string>}><circle r="8" fill="#E8C55A" stroke={INK} stroke-width="2" /><path d="M-6 -3 q-9 -8 -13 -2 q5 2 13 4z M6 -3 q9 -8 13 -2 q-5 2 -13 4z" fill="#fff" stroke={INK} stroke-width="1.2" /></g>)}</g>;
    case 'confetti': return <g>{Array.from({ length: 30 }, (_, i) => <rect key={i} class="sc-confetti" style={{ '--d': `${((i * 13) % 9) / 10}s` } as Record<string, string>} x={(i * 37 + 5) % 400} y="-12" width="7" height="11" rx="1.5" fill={['#E8C55A', '#D9653B', '#3F8F5A', '#3B6FB6', '#fff'][i % 5]} stroke={INK} stroke-width="1" />)}</g>;
    case 'fireworks': return <g>{[[90, 70, '#D9653B'], [210, 50, '#E8C55A'], [320, 80, '#3B6FB6']].map(([fx, fy, c], k) => <g key={k} transform={`translate(${fx} ${fy})`}><g class="sc-firework" style={{ '--d': `${k * 0.25}s` } as Record<string, string>}>{[0, 40, 80, 120, 160, 200, 240, 280, 320].map((r) => <path key={r} d="M0 -8 v-26" stroke={c as string} stroke-width="5" stroke-linecap="round" transform={`rotate(${r})`} />)}</g></g>)}</g>;
    case 'flash': return <rect class="sc-flash" width="400" height="300" fill="#fff" />;
    case 'stampNO': case 'stampOK': return <g style={{ transform: `translate(${x}px, ${y}px)` }}><g class="sc-stamp"><rect x="-52" y="-30" width="104" height="60" rx="10" fill="rgba(251,247,238,.85)" stroke={f.name === 'stampNO' ? '#C23B3B' : '#2C6B41'} stroke-width="7" /><text y="16" text-anchor="middle" font-size="44" font-weight="700" fill={f.name === 'stampNO' ? '#C23B3B' : '#2C6B41'} font-family="'DM Serif Display', Georgia, serif">{f.name === 'stampNO' ? 'NO' : 'YES'}</text></g></g>;
    default: return null;
  }
}

export function SceneStage({ scene, onBeat }: { scene: Scene; onBeat?: (beat: number, of: number) => void }) {
  const BEAT = 1000;
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [step, setStep] = useState(reduce ? scene.beats.length - 1 : 0);
  useEffect(() => {
    onBeat?.(step, scene.beats.length);
    if (step >= scene.beats.length - 1) return;
    const t = setTimeout(() => setStep(step + 1), BEAT);
    return () => clearTimeout(t);
  }, [step]);
  const w = play(scene, step);
  const shake = w.fx.some((f) => f.at === step && (f.name === 'shake' || f.name === 'boom' || f.name === 'stampNO'));
  const hand = (a: Actor) => ({ x: a.x + (a.flip ? -9 : 9), y: ((GROUND - 58 * SIZE) / 300) * 100 });
  return (
    <svg class={`scene ${shake ? 'shaking' : ''}`} key={shake ? `s${step}` : 's'} viewBox="0 0 400 300" role="img" aria-hidden="true">
      {SETS[scene.set] ?? SETS.office}
      {w.rain && <g class="sc-rain">{Array.from({ length: 26 }, (_, i) => <path key={i} d={`M${(i * 43) % 400} ${(i * 29) % 240} l-6 18`} stroke="#7FB7D9" stroke-width="3" stroke-linecap="round" style={{ '--d': `${(i % 7) / 10}s` } as Record<string, string>} />)}</g>}
      {w.things.filter((t) => t.y < 80).map((t) => <ThingView key={t.id} t={t} step={step} held={null} />)}
      {w.water && <g class="sc-water"><rect y="150" width="400" height="160" fill="#7FB7D9" opacity=".88" /><path d="M-20 150 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke={INK} stroke-width="3" fill="none" /></g>}
      {w.actors.map((a) => (
        <g key={a.id} class="sc-actor" style={{ transform: `translate(${px(a.x)}px, ${GROUND}px)` }}>
          <g class={a.bornAt === step && step > 0 ? 'sc-pop' : ''}><g style={{ transform: `scale(${a.flip ? -SIZE : SIZE}, ${SIZE})` }} class="sc-flipper"><Puppet who={a.id} pose={a.pose} walking={a.movedAt === step} /></g></g>
        </g>
      ))}
      {w.things.filter((t) => t.y >= 80).map((t) => { const holder = w.actors.find((a) => a.holding === t.id); return <ThingView key={t.id} t={t} step={step} held={holder ? hand(holder) : null} />; })}
      {w.crowd !== 'none' && <g class={`sc-crowd ${w.crowd}`}>{Array.from({ length: 9 }, (_, i) => <g key={i} transform={`translate(${22 + i * 44} 300)`}><g class="sc-bob" style={{ '--d': `${i * 0.07}s` } as Record<string, string>}><path d="M-16 0 q0 -30 16 -30 q16 0 16 30z" fill={['#D9653B', '#3B6FB6', '#B0892A', '#7A5C9C', '#3F8F5A'][i % 5]} stroke={INK} stroke-width="2.5" /><circle cy="-40" r="12" fill={['#F0C4A0', '#B9794E', '#E2A878', '#8A5A3C'][i % 4]} stroke={INK} stroke-width="2.5" />{w.crowd === 'protest' ? <><path d="M10 -30 v-34" stroke={INK} stroke-width="3" /><rect x="-4" y="-84" width="30" height="20" fill="#fff" stroke={INK} stroke-width="2" /><path d="M2 -74 h18" stroke="#C23B3B" stroke-width="3.5" /></> : <path d="M-10 -28 l-8 -18 M10 -28 l8 -18" stroke={INK} stroke-width="3" stroke-linecap="round" />}</g></g>)}</g>}
      {w.fog && <g class="sc-fog"><rect width="400" height="300" fill="#E9E6DF" opacity=".86" />{[40, 150, 260].map((x, i) => <ellipse key={x} cx={x + 40} cy={90 + i * 60} rx="120" ry="34" fill="#fff" opacity=".8" />)}</g>}
      {w.fx.filter((f) => f.at === step || ((f.name === 'stampNO' || f.name === 'stampOK') && f.at === step - 1)).map((f) => <Effect key={f.key} f={f} />)}
      {w.bubbles.filter((b) => b.at === step).map((b) => { const a = w.actors.find((x) => x.id === b.who); if (!a) return null; const bw = Math.max(50, b.text.length * 8.4 + 22), bx = Math.min(396 - bw, Math.max(4, px(a.x) - bw / 2)); return <g key={b.who + b.at} class="sc-bubble"><rect x={bx} y="62" width={bw} height="34" rx="12" fill="#fff" stroke={INK} stroke-width="3" /><path d={`M${px(a.x) - 6} 94 l6 12 l6 -12z`} fill="#fff" stroke={INK} stroke-width="3" /><path d={`M${px(a.x) - 8} 93 h16`} stroke="#fff" stroke-width="4" /><text x={bx + bw / 2} y="85" text-anchor="middle" font-size="16" font-weight="600" fill={INK} font-family="Fredoka, sans-serif">{b.text}</text></g>; })}
    </svg>
  );
}

function ThingView({ t, step, held }: { t: Thing; step: number; held: { x: number; y: number } | null }) {
  const x = held ? held.x : t.x, y = held ? held.y : t.y, s = held ? Math.min(t.s, 0.42) : t.s;
  const draw = t.name === 'sign' ? null : PROPS[t.name];
  const cls = t.gone ? (t.gone === 'squash' ? 'sc-squash' : 'sc-gone') : t.bornAt === step ? `sc-${t.enter.split(' ')[0]} ${t.enter.split(' ')[1] ?? ''}` : t.changedAt === step ? 'sc-morph' : '';
  if (t.gone && (t.goneAt ?? 0) < step - 1 && t.gone !== 'squash') return null;
  return (
    <g class="sc-thing" style={{ transform: `translate(${px(x)}px, ${py(y)}px) scale(${s})` }}>
      <g class={cls}><g transform="translate(-50 -100)">{t.name === 'sign' ? <Sign text={t.text ?? ''} /> : draw ? draw() : null}</g></g>
    </g>
  );
}
