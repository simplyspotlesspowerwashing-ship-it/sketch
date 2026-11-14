// All art is original SVG authored here: flat paper cut-out shapes with a dark outline.
import type { ComponentChildren } from 'preact';
import { GROUPS } from '../engine/types.ts';
import type { Effects, GroupId, State } from '../engine/types.ts';

export const INK = '#29231F';
export const GROUP_COLOR: Record<GroupId, string> = { people: '#D9653B', business: '#3F8F5A', law: '#3B6FB6', press: '#B0892A' };
export const GROUP_NAME: Record<GroupId, string> = { people: 'People', business: 'Business', law: 'Law', press: 'Press' };
export const LEADER: Record<GroupId, string> = { people: 'pam', business: 'chad', law: 'barb', press: 'marge' };
export const NAMES: Record<string, string> = {
  pam: 'Pam, PTA President', chad: 'Chad, Billionaire', barb: 'Chief Barb', marge: 'Marge, The Bugle', gerald: 'Gerald, Goose Union',
  dave: 'Deputy Dave', linda: 'Linda, Librarian', doug: 'Doug, Treasurer', steve: 'Stormy Steve', timmy: 'Timmy, age 8', stranger: 'The Stranger',
};
export type Mood = 'neutral' | 'pleased' | 'annoyed';

const S = { stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' as const, 'stroke-linecap': 'round' as const };

function Face({ mood, y = 0, eye = INK, gap = 10 }: { mood: Mood; y?: number; eye?: string; gap?: number }) {
  const brow = mood === 'annoyed' ? [-3, 3] : mood === 'pleased' ? [1, 1] : [0, 0];
  return (
    <g transform={`translate(50 ${46 + y})`}>
      <path d={`M${-gap - 5} ${-9 + brow[0]!} L${-gap + 4} ${-9 + brow[1]!}`} {...S} fill="none" />
      <path d={`M${gap - 4} ${-9 + brow[1]!} L${gap + 5} ${-9 + brow[0]!}`} {...S} fill="none" />
      {mood === 'pleased' ? (
        <>
          <path d={`M${-gap - 4} -1 q4 -5 8 0`} {...S} fill="none" />
          <path d={`M${gap - 4} -1 q4 -5 8 0`} {...S} fill="none" />
        </>
      ) : (
        <>
          <circle cx={-gap} cy={-1} r="2.6" fill={eye} />
          <circle cx={gap} cy={-1} r="2.6" fill={eye} />
        </>
      )}
      {mood === 'pleased' && <path d="M-9 9 q9 10 18 0 z" fill="#fff" {...S} />}
      {mood === 'neutral' && <path d="M-6 12 q6 3 12 0" {...S} fill="none" />}
      {mood === 'annoyed' && <path d="M-7 14 q7 -7 14 0" {...S} fill="none" />}
    </g>
  );
}

function Bust({ top, skin, mood, children, hair, over, collar }: { top: string; skin: string; mood: Mood; children?: ComponentChildren; hair?: ComponentChildren; over?: ComponentChildren; collar?: ComponentChildren }) {
  return (
    <>
      <path d="M12 104 q2 -30 38 -30 q36 0 38 30 z" fill={top} {...S} />
      {collar}
      <rect x="43" y="62" width="14" height="16" rx="5" fill={skin} {...S} />
      {hair}
      <ellipse cx="50" cy="45" rx="23" ry="25" fill={skin} {...S} />
      <ellipse cx="27" cy="47" rx="4" ry="6" fill={skin} {...S} />
      <ellipse cx="73" cy="47" rx="4" ry="6" fill={skin} {...S} />
      {children}
      <Face mood={mood} />
      {over}
    </>
  );
}

const CAST: Record<string, (mood: Mood) => ComponentChildren> = {
  pam: (m) => (
    <Bust top="#D9653B" skin="#F0C4A0" mood={m}
      hair={<path d="M22 52 q-6 -40 28 -40 q34 0 28 40 q2 12 -6 16 l-44 0 q-8 -4 -6 -16z" fill="#8A3B22" {...S} />}
      over={<><path d="M26 34 q24 -20 48 0 q-10 -6 -24 -6 q-14 0 -24 6z" fill="#8A3B22" {...S} /><path d="M27 30 q23 -14 46 0" stroke="#F2EBDD" stroke-width="4" fill="none" stroke-linecap="round" /></>}
      collar={<><path d="M38 76 l12 12 l12 -12" fill="#F2EBDD" {...S} /><rect x="64" y="82" width="16" height="20" rx="2" fill="#F2EBDD" {...S} /><path d="M67 88h10M67 93h10" stroke={INK} stroke-width="1.6" /></>} />
  ),
  chad: (m) => (
    <Bust top="#3F8F5A" skin="#E2A878" mood={m}
      hair={<path d="M26 40 q-2 -30 26 -29 q24 1 22 26 q-12 -12 -30 -8 q-10 2 -18 11z" fill="#E8C55A" {...S} />}
      over={<><path d="M27 38 q10 -14 30 -12 q10 1 16 8 q-4 -18 -22 -19 q-22 -1 -24 23z" fill="#E8C55A" {...S} />{m !== 'pleased' && <g><rect x="31" y="39" width="16" height="10" rx="4" fill={INK} /><rect x="53" y="39" width="16" height="10" rx="4" fill={INK} /><path d="M47 43h6" stroke={INK} stroke-width="2.5" /></g>}</>}
      collar={<><path d="M38 76 l12 10 l12 -10 l4 8 l-16 14 l-16 -14z" fill="#fff" {...S} /><path d="M50 86 l-4 6 l4 14 l4 -14z" fill="#E8C55A" {...S} /></>} />
  ),
  barb: (m) => (
    <Bust top="#3B6FB6" skin="#B9794E" mood={m}
      hair={<path d="M25 50 q-3 -18 6 -26 l38 0 q9 8 6 26z" fill="#3A2A22" {...S} />}
      over={<><path d="M22 32 q28 -16 56 0 l-3 -14 q-25 -12 -50 0z" fill="#27497A" {...S} /><path d="M20 33 q30 -8 60 0 l2 5 q-32 -8 -64 0z" fill={INK} {...S} /><path d="M50 15 l4 4 l-1 6 l-6 0 l-1 -6z" fill="#E8C55A" {...S} /></>}
      collar={<><path d="M36 78 l14 8 l14 -8" fill="none" {...S} /><path d="M66 84 l4 -3 l4 3 l-1 7 l-3 2 l-3 -2z" fill="#E8C55A" {...S} /></>} />
  ),
  marge: (m) => (
    <Bust top="#B0892A" skin="#F3D3BC" mood={m}
      hair={<><ellipse cx="50" cy="20" rx="19" ry="17" fill="#C9C3BC" {...S} /><path d="M24 48 q-4 -26 26 -27 q30 1 26 27z" fill="#C9C3BC" {...S} /></>}
      over={<><path d="M30 40 l14 -2 l3 8 q-8 5 -16 2z M70 40 l-14 -2 l-3 8 q8 5 16 2z" fill="rgba(255,255,255,.35)" {...S} /><path d="M47 43h6" stroke={INK} stroke-width="2.5" /><path d="M72 30 l12 -14" stroke="#E8C55A" stroke-width="4" stroke-linecap="round" /><path d="M72 30 l12 -14" stroke={INK} stroke-width="1" /></>}
      collar={<path d="M36 76 q14 14 28 0 l4 6 q-18 16 -36 0z" fill="#F2EBDD" {...S} />} />
  ),
  linda: (m) => (
    <Bust top="#7A5C9C" skin="#8A5A3C" mood={m}
      hair={<><circle cx="50" cy="13" r="11" fill="#2B2130" {...S} /><path d="M24 50 q-4 -30 26 -30 q30 0 26 30z" fill="#2B2130" {...S} /></>}
      over={<><circle cx="40" cy="45" r="9" fill="rgba(255,255,255,.3)" {...S} /><circle cx="60" cy="45" r="9" fill="rgba(255,255,255,.3)" {...S} /><path d="M49 45h2" stroke={INK} stroke-width="2.5" /><path d="M44 8 l12 0 l-2 -6 l-8 0z" fill="#C9C3BC" {...S} /></>}
      collar={<path d="M40 76 l10 14 l10 -14" fill="none" {...S} />} />
  ),
  doug: (m) => (
    <Bust top="#8C8577" skin="#F0C9A8" mood={m}
      hair={<path d="M24 46 q-2 -10 4 -14 l4 10z M76 46 q2 -10 -4 -14 l-4 10z" fill="#6B5B4B" {...S} />}
      over={<><path d="M40 24 q10 -6 20 0" stroke={INK} stroke-width="2" fill="none" /><path d="M76 26 q5 8 0 12 q-5 -4 0 -12z" fill="#9CC9E8" {...S} /></>}
      collar={<><path d="M38 76 l12 10 l12 -10 l4 8 l-16 14 l-16 -14z" fill="#fff" {...S} /><path d="M50 86 l-4 6 l4 14 l4 -14z" fill="#C23B3B" {...S} /></>} />
  ),
  steve: (m) => (
    <Bust top="#E8C55A" skin="#F0C4A0" mood={m}
      hair={<path d="M18 62 q-8 -56 32 -56 q40 0 32 56 q-6 10 -14 12 l-36 0 q-8 -2 -14 -12z" fill="#E8C55A" {...S} />}
      over={<><path d="M26 36 q24 -22 48 0" fill="none" {...S} /><g transform="translate(70 10)"><path d="M0 12 q-8 0 -7 -7 q1 -6 8 -5 q3 -7 11 -4 q7 3 4 10 q5 2 2 6z" fill="#fff" {...S} /></g></>}
      collar={<circle cx="50" cy="88" r="3" fill={INK} />} />
  ),
  timmy: (m) => (
    <Bust top="#D9653B" skin="#F5CFAE" mood={m}
      hair={<path d="M26 44 q-2 -20 24 -22 q26 2 24 22z" fill="#B5651D" {...S} />}
      over={<><path d="M24 34 q26 -24 52 0 l-2 -6 q-24 -22 -48 0z" fill="#3B6FB6" {...S} /><path d="M60 30 q16 -2 24 6 q-12 2 -24 -2z" fill="#3B6FB6" {...S} /><circle cx="36" cy="53" r="1.4" fill="#B5651D" /><circle cx="41" cy="55" r="1.4" fill="#B5651D" /><circle cx="59" cy="55" r="1.4" fill="#B5651D" /><circle cx="64" cy="53" r="1.4" fill="#B5651D" /></>}
      collar={<path d="M34 80 h32" stroke="#F2EBDD" stroke-width="5" />} />
  ),
  stranger: (m) => (
    <>
      <path d="M10 104 q2 -32 40 -32 q38 0 40 32z" fill="#4A4038" {...S} />
      <path d="M30 76 l20 -18 l20 18 l-6 12 l-14 -12 l-14 12z" fill="#5C5046" {...S} />
      <ellipse cx="50" cy="46" rx="21" ry="23" fill="#3A322C" {...S} />
      <path d="M36 44 q5 -4 10 0 M54 44 q5 -4 10 0" stroke="#F2EBDD" stroke-width="3" fill="none" stroke-linecap="round" transform={m === 'annoyed' ? 'translate(0 2)' : ''} />
      {m === 'pleased' && <path d="M42 58 q8 6 16 0" stroke="#F2EBDD" stroke-width="2.5" fill="none" stroke-linecap="round" />}
      <path d="M14 34 q36 -14 72 0 l-4 6 q-32 -10 -64 0z" fill={INK} {...S} />
      <path d="M28 32 q2 -24 22 -24 q20 0 22 24 q-22 -6 -44 0z" fill="#4A4038" {...S} />
      <path d="M29 28 q21 -6 42 0" stroke="#C23B3B" stroke-width="4" fill="none" />
    </>
  ),
  gerald: (m) => (
    <>
      <path d="M22 104 q0 -26 28 -26 q28 0 28 26z" fill="#fff" {...S} />
      <path d="M40 84 q-6 -30 0 -50 l20 0 q6 20 0 50z" fill="#fff" {...S} />
      <ellipse cx="50" cy="32" rx="19" ry="18" fill="#fff" {...S} />
      <path d={m === 'annoyed' ? 'M52 34 l34 -2 l-34 12z' : 'M52 32 l32 6 l-32 6z'} fill="#E8943A" {...S} />
      {m === 'pleased' && <path d="M54 38 l26 0" stroke={INK} stroke-width="1.6" />}
      <circle cx="44" cy="28" r="3" fill={INK} />
      <path d={m === 'annoyed' ? 'M36 20 l12 5' : 'M38 21 l10 -1'} {...S} fill="none" />
      <path d="M30 20 q20 -14 40 0 l-3 -8 q-17 -10 -34 0z" fill="#3B6FB6" {...S} />
      <path d="M58 18 q14 -2 20 4 q-10 2 -20 -1z" fill="#3B6FB6" {...S} />
      <rect x="34" y="60" width="32" height="9" rx="2" fill="#C23B3B" {...S} />
    </>
  ),
  dave: (m) => {
    const raccoon = (x: number, y: number, s: number, mood: Mood) => (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M-16 -12 l-4 -12 l12 6z M16 -12 l4 -12 l-12 6z" fill="#8C8577" {...S} />
        <ellipse cx="0" cy="0" rx="19" ry="15" fill="#B8B1A4" {...S} />
        <path d="M-17 -2 q8 -8 15 0 q-4 8 -12 6z M17 -2 q-8 -8 -15 0 q4 8 12 6z" fill="#3A322C" />
        <circle cx="-8" cy="0" r="2.4" fill="#fff" /><circle cx="8" cy="0" r="2.4" fill="#fff" />
        <ellipse cx="0" cy="7" rx="3.5" ry="2.5" fill={INK} />
        {mood === 'pleased' && <path d="M-5 10 q5 5 10 0" {...S} fill="none" />}
        {mood === 'annoyed' && <path d="M-5 13 q5 -4 10 0" {...S} fill="none" />}
      </g>
    );
    return (
      <>
        <path d="M80 96 q14 -4 12 -18 q-8 2 -10 10z" fill="#8C8577" {...S} />
        <path d="M18 104 l6 -52 q26 -10 52 0 l6 52z" fill="#C8A26A" {...S} />
        <path d="M50 52 l0 52" stroke={INK} stroke-width="2.5" />
        <path d="M34 50 l16 16 l16 -16 l6 10 l-22 18 l-22 -18z" fill="#B58D55" {...S} />
        <circle cx="45" cy="80" r="2" fill={INK} /><circle cx="45" cy="92" r="2" fill={INK} />
        <path d="M56 76 l16 0 l0 16 l-16 0z" fill="#3A322C" {...S} />
        {raccoon(64, 85, 0.36, 'neutral')}
        {raccoon(50, 36, 1, m)}
        <path d="M22 22 q28 -10 56 0 l-2 5 q-26 -8 -52 0z" fill="#6B5B4B" {...S} />
        <path d="M32 21 q2 -16 18 -16 q16 0 18 16 q-18 -5 -36 0z" fill="#8C7A64" {...S} />
      </>
    );
  },
};

export function Portrait({ who, mood = 'neutral', size = 64, ring }: { who: string; mood?: Mood; size?: number; ring?: string }) {
  const draw = CAST[who] ?? CAST.doug!;
  const id = `clip-${who}`;
  return (
    <svg class="portrait" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`${NAMES[who] ?? who}, ${mood}`}>
      <defs><clipPath id={id}><circle cx="50" cy="50" r="47" /></clipPath></defs>
      <circle cx="50" cy="50" r="47" fill={ring ?? '#E6DBC6'} />
      <g clip-path={`url(#${id})`}>{draw(mood)}</g>
      <circle cx="50" cy="50" r="47" fill="none" stroke={INK} stroke-width="3" />
    </svg>
  );
}


// ---------- sprites (44 x 44), shared by the mini-games, the intro clips and the town ----------
const SO = { stroke: INK, 'stroke-width': 2, 'stroke-linejoin': 'round' as const, 'stroke-linecap': 'round' as const };
const SPRITES: Record<string, () => ComponentChildren> = {
  goose: () => <><ellipse cx="20" cy="30" rx="13" ry="8" fill="#fff" {...SO} /><path d="M28 28 q6 -14 2 -20" stroke={INK} stroke-width="8" fill="none" stroke-linecap="round" /><path d="M28 28 q6 -14 2 -20" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round" /><path d="M32 6 l9 2 l-9 4z" fill="#E8943A" {...SO} /><circle cx="30" cy="8" r="1.2" fill={INK} /></>,
  raccoon: () => <><path d="M8 14 l-2 -9 l8 4z M36 14 l2 -9 l-8 4z" fill="#8C8577" {...SO} /><ellipse cx="22" cy="24" rx="16" ry="13" fill="#B8B1A4" {...SO} /><path d="M8 22 q7 -7 13 0 q-4 7 -10 5z M36 22 q-7 -7 -13 0 q4 7 10 5z" fill="#3A322C" /><circle cx="15" cy="23" r="2" fill="#fff" /><circle cx="29" cy="23" r="2" fill="#fff" /><ellipse cx="22" cy="30" rx="3" ry="2" fill={INK} /></>,
  frog: () => <><ellipse cx="22" cy="28" rx="15" ry="10" fill="#5FA77A" {...SO} /><circle cx="14" cy="16" r="5.5" fill="#fff" {...SO} /><circle cx="30" cy="16" r="5.5" fill="#fff" {...SO} /><circle cx="14" cy="16" r="2" fill={INK} /><circle cx="30" cy="16" r="2" fill={INK} /><path d="M14 30 q8 5 16 0" fill="none" {...SO} /></>,
  cheese: () => <><path d="M4 32 l30 -20 l6 20z" fill="#F7D774" {...SO} /><circle cx="18" cy="27" r="3" fill="#E8C55A" {...SO} /><circle cx="25" cy="19" r="1.3" fill={INK} /><circle cx="31" cy="19" r="1.3" fill={INK} /><path d="M25 25 q3 2 6 0" fill="none" {...SO} /></>,
  coin: () => <><circle cx="22" cy="22" r="16" fill="#E8C55A" {...SO} /><circle cx="22" cy="22" r="11" fill="none" stroke={INK} stroke-width="1.5" /><path d="M22 14 v16 M18 18 q4 -3 8 0 q0 4 -4 4 q-4 0 -4 4 q4 3 8 0" fill="none" {...SO} /></>,
  paper: () => <><path d="M9 5 h20 l7 7 v27 h-27z" fill="#fff" {...SO} /><path d="M29 5 v7 h7" fill="none" {...SO} /><path d="M14 18 h16 M14 24 h16 M14 30 h10" {...SO} /></>,
  star: () => <path d="M22 4 l5.3 11.2 l12.2 1.5 l-9 8.4 l2.3 12.1 l-10.8 -6 l-10.8 6 l2.3 -12.1 l-9 -8.4 l12.2 -1.5z" fill="#F7D774" {...SO} />,
  heli: () => <><path d="M4 12 h36" {...SO} stroke-width="3" /><path d="M22 12 v5" {...SO} /><ellipse cx="20" cy="26" rx="14" ry="9" fill="#3B6FB6" {...SO} /><path d="M32 23 l10 -4 v8z" fill="#3B6FB6" {...SO} /><path d="M11 23 h9 v6 h-9z" fill="#CFE3EE" {...SO} /><path d="M10 39 h22 M15 35 v4 M26 35 v4" {...SO} /></>,
  car: () => <><path d="M4 30 v-8 l7 -9 h18 l8 9 h3 v8z" fill="#D9653B" {...SO} /><path d="M12 22 l4 -6 h6 v6z M25 22 v-6 h4 l4 6z" fill="#CFE3EE" {...SO} /><circle cx="12" cy="31" r="5" fill={INK} /><circle cx="32" cy="31" r="5" fill={INK} /></>,
  cloud: () => <><path d="M10 34 q-8 0 -7 -8 q1 -7 9 -6 q3 -10 13 -8 q9 2 8 11 q8 1 7 7 q-1 4 -6 4z" fill="#8C97A3" {...SO} /><path d="M20 34 l-3 7 M28 34 l-3 7" stroke="#F7D774" stroke-width="2.5" stroke-linecap="round" /></>,
  snow: () => <><circle cx="22" cy="30" r="11" fill="#fff" {...SO} /><circle cx="22" cy="13" r="8" fill="#fff" {...SO} /><circle cx="19" cy="11" r="1.3" fill={INK} /><circle cx="25" cy="11" r="1.3" fill={INK} /><path d="M22 14 l6 2 l-6 1z" fill="#E8943A" {...SO} stroke-width="1" /><circle cx="22" cy="27" r="1.3" fill={INK} /><circle cx="22" cy="33" r="1.3" fill={INK} /></>,
  brick: () => <><rect x="4" y="12" width="36" height="20" rx="2" fill="#C8704A" {...SO} /><path d="M4 22 h36 M16 12 v10 M28 12 v10 M10 22 v10 M22 22 v10 M34 22 v10" stroke={INK} stroke-width="1.4" /></>,
  note: () => <><path d="M16 32 v-22 l18 -4 v22" fill="none" {...SO} stroke-width="3" /><ellipse cx="11" cy="33" rx="6" ry="4.5" fill={INK} /><ellipse cx="29" cy="29" rx="6" ry="4.5" fill={INK} /></>,
  kid: () => <><path d="M10 42 q0 -14 12 -14 q12 0 12 14z" fill="#D9653B" {...SO} /><circle cx="22" cy="18" r="10" fill="#F5CFAE" {...SO} /><path d="M12 15 q10 -12 20 0 l-1 -4 q-9 -9 -18 0z" fill="#3B6FB6" {...SO} /><path d="M30 13 q7 -1 10 3 q-5 1 -10 -1z" fill="#3B6FB6" {...SO} /><circle cx="18" cy="19" r="1.3" fill={INK} /><circle cx="26" cy="19" r="1.3" fill={INK} /><path d="M18 23 q4 3 8 0" fill="none" {...SO} /></>,
  hole: () => <><ellipse cx="22" cy="26" rx="19" ry="10" fill={INK} /><ellipse cx="22" cy="24" rx="14" ry="6" fill="#3A322C" /><circle cx="17" cy="23" r="1.6" fill="#F2EBDD" /><circle cx="27" cy="23" r="1.6" fill="#F2EBDD" /></>,
  drop: () => <><path d="M22 4 q14 18 14 26 a14 12 0 0 1 -28 0 q0 -8 14 -26z" fill="#7FB7D9" {...SO} /><path d="M15 29 q0 6 6 7" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" /></>,
  bolt: () => <path d="M26 3 l-16 22 h9 l-4 16 l18 -24 h-10z" fill="#F7D774" {...SO} />,
  acorn: () => <><path d="M10 20 q12 26 24 0z" fill="#B5651D" {...SO} /><path d="M7 20 q15 -14 30 0z" fill="#7A5234" {...SO} /><path d="M22 10 v-6" {...SO} /></>,
  ghost: () => <><path d="M8 40 v-22 a14 14 0 0 1 28 0 v22 l-5 -5 l-4.5 5 l-4.5 -5 l-4.5 5 l-4.5 -5z" fill="#fff" {...SO} /><circle cx="17" cy="18" r="2.5" fill={INK} /><circle cx="27" cy="18" r="2.5" fill={INK} /><ellipse cx="22" cy="26" rx="3" ry="4" fill={INK} /></>,
  monster: () => <><path d="M14 42 q-6 -30 8 -36 q14 0 12 12 q-8 -3 -8 6 v18z" fill="#5FA77A" {...SO} /><circle cx="27" cy="13" r="2" fill={INK} /><path d="M17 16 l-5 -3 M17 22 l-6 -1 M18 28 l-6 1" {...SO} /></>,
  carrot: () => <><path d="M14 14 q18 4 22 26 q-22 -4 -26 -22z" fill="#E8943A" {...SO} /><path d="M12 14 l-6 -8 M14 12 l0 -9 M10 16 l-8 -2" stroke="#3F8F5A" stroke-width="3" stroke-linecap="round" /></>,
  icecream: () => <><path d="M12 22 l10 20 l10 -20z" fill="#E8C55A" {...SO} /><circle cx="22" cy="15" r="11" fill="#F6C6D0" {...SO} /><circle cx="18" cy="12" r="1.3" fill={INK} /><circle cx="26" cy="12" r="1.3" fill={INK} /></>,
  pie: () => <><path d="M4 26 q18 -18 36 0z" fill="#E8C55A" {...SO} /><path d="M4 26 h36 l-4 10 h-28z" fill="#C8704A" {...SO} /><path d="M12 20 q2 -3 4 0 M21 16 q2 -3 4 0 M29 20 q2 -3 4 0" fill="none" {...SO} /></>,
  pigeon: () => <><ellipse cx="20" cy="28" rx="14" ry="9" fill="#8C97A3" {...SO} /><circle cx="31" cy="15" r="7" fill="#8C97A3" {...SO} /><path d="M37 15 l6 2 l-6 2z" fill="#E8943A" {...SO} /><circle cx="33" cy="13" r="1.5" fill="#E8943A" /><path d="M24 22 q4 4 9 2" fill="none" stroke="#5FA77A" stroke-width="2.5" /><path d="M8 26 q-6 2 -6 8 q6 -1 9 -4z" fill="#6B7682" {...SO} /></>,
  dog: () => <><ellipse cx="22" cy="28" rx="15" ry="9" fill="#C8A26A" {...SO} /><circle cx="33" cy="16" r="8" fill="#C8A26A" {...SO} /><path d="M27 10 q-5 -2 -4 8z" fill="#7A5234" {...SO} /><circle cx="35" cy="15" r="1.5" fill={INK} /><ellipse cx="40" cy="18" rx="2.5" ry="2" fill={INK} /><path d="M8 24 q-6 -6 -4 -10" fill="none" {...SO} /><path d="M24 22 l2 6 l2 -6z" fill="#E8C55A" {...SO} stroke-width="1" /></>,
  bomb: () => <><circle cx="20" cy="26" r="14" fill={INK} /><circle cx="15" cy="21" r="3.5" fill="#6B6257" /><path d="M28 14 q4 -6 9 -6" fill="none" stroke="#8C7A64" stroke-width="3" stroke-linecap="round" /><path d="M37 8 l3 -4 M37 8 l4 1 M37 8 l1 4" stroke="#E8943A" stroke-width="2.5" stroke-linecap="round" /></>,
  bear: () => <><circle cx="10" cy="11" r="6" fill="#7A5234" {...SO} /><circle cx="34" cy="11" r="6" fill="#7A5234" {...SO} /><circle cx="22" cy="24" r="16" fill="#7A5234" {...SO} /><ellipse cx="22" cy="30" rx="7" ry="5" fill="#E6C9A8" {...SO} /><ellipse cx="22" cy="27.5" rx="2.5" ry="1.8" fill={INK} /><circle cx="16" cy="20" r="1.8" fill={INK} /><circle cx="28" cy="20" r="1.8" fill={INK} /></>,
  cone: () => <><path d="M22 4 l12 32 h-24z" fill="#E8943A" {...SO} /><path d="M15 22 h14 M12 30 h20" stroke="#fff" stroke-width="3.5" /><rect x="5" y="36" width="34" height="5" rx="2" fill="#E8943A" {...SO} /></>,
  rocket: () => <><path d="M22 3 q10 10 8 26 h-16 q-2 -16 8 -26z" fill="#F2EBDD" {...SO} /><path d="M14 24 l-7 9 l8 -2z M30 24 l7 9 l-8 -2z" fill="#C23B3B" {...SO} /><circle cx="22" cy="15" r="4" fill="#7FB7D9" {...SO} /><path d="M18 31 q4 12 8 0z" fill="#E8943A" {...SO} /></>,
};
export const SPRITE_NAMES = Object.keys(SPRITES);
export const spriteBody = (theme: string): ComponentChildren => (SPRITES[theme] ?? SPRITES.star!)();
export function Sprite({ theme, size = 44 }: { theme: string; size?: number }) {
  return <svg class="sprite" width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">{spriteBody(theme)}</svg>;
}

// ---------- icons ----------
export const Icon = {
  ticket: (p: { size?: number }) => (
    <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4z" fill="#E8C55A" stroke={INK} stroke-width="2" stroke-linejoin="round" /><path d="M14 8v10" stroke={INK} stroke-width="2" stroke-dasharray="2 2" /></svg>
  ),
  coin: (p: { size?: number }) => (
    <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#E8C55A" stroke={INK} stroke-width="2" /><path d="M12 7v10M9.5 9.5q2.5 -2 5 0q0 2.5 -2.5 2.500q-2.5 0 -2.5 2.500q2.5 2 5 0" fill="none" stroke={INK} stroke-width="1.8" stroke-linecap="round" /></svg>
  ),
  scroll: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h13v15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-2h10v2" fill="#fff" stroke={INK} stroke-width="2" stroke-linejoin="round" /><path d="M9 8h7M9 12h7" stroke={INK} stroke-width="2" stroke-linecap="round" /></svg>
  ),
  pen: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1-5L16 4l4 4L9 19z" fill="#E8C55A" stroke={INK} stroke-width="2" stroke-linejoin="round" /><path d="M13 7l4 4" stroke={INK} stroke-width="2" /></svg>
  ),
  dice: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="#fff" stroke={INK} stroke-width="2" /><circle cx="8" cy="8" r="1.7" fill={INK} /><circle cx="16" cy="16" r="1.7" fill={INK} /><circle cx="12" cy="12" r="1.7" fill={INK} /><circle cx="16" cy="8" r="1.7" fill={INK} /><circle cx="8" cy="16" r="1.7" fill={INK} /></svg>
  ),
  sound: (p: { on: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill={INK} />{p.on ? <path d="M16 8q3 4 0 8M19 5q5 7 0 14" fill="none" stroke={INK} stroke-width="2" stroke-linecap="round" /> : <path d="M16 9l6 6M22 9l-6 6" stroke={INK} stroke-width="2" stroke-linecap="round" />}</svg>
  ),
};

/** Approval change shown as arrows: one for 5, two for 10 or more. Shape and label carry the meaning, not colour alone. */
export function Arrows({ group, value }: { group: GroupId; value: number }) {
  const n = Math.abs(value) >= 8 ? 2 : 1;
  const up = value > 0;
  return (
    <span class={`chip arrows ${up ? 'up' : 'down'}`} style={{ '--g': GROUP_COLOR[group] }} role="img" aria-label={`${GROUP_NAME[group]} ${up ? 'up' : 'down'} ${Math.abs(value)}`}>
      <i class="dot" />
      {GROUP_NAME[group]} <b>{(up ? '▲' : '▼').repeat(n)}</b>
    </span>
  );
}

// ---------- town scene ----------
const SKY = ['#F6D9A8', '#CFE3EE', '#BFDDF0', '#C9E2EC', '#F2D2A0', '#EBA97C', '#2B3355'];

export interface Pulse { key: number; effects: Effects }

function Car({ color, police }: { color: string; police?: boolean }) {
  return (
    <g>
      <path d="M-13 0 v-6 l5 -6 h13 l6 6 h4 v6z" fill={color} stroke={INK} stroke-width="1.6" stroke-linejoin="round" />
      <path d="M-6 -6 l3 -4 h4 v4z M3 -6 v-4 h3 l3 4z" fill="#CFE3EE" stroke={INK} stroke-width="1" />
      <circle cx="-7" cy="1" r="3" fill={INK} /><circle cx="8" cy="1" r="3" fill={INK} />
      {police && <rect class="blink" x="-2" y="-15" width="5" height="3" rx="1" fill="#C23B3B" stroke={INK} stroke-width="1" />}
    </g>
  );
}

export interface Burst { key: number; skill: 0 | 1 | 2 }
/** Where each group lives on the map: [centre x, top y, half width]. */
const HOME: Record<GroupId, [number, number, number]> = { people: [55, 60, 40], law: [211, 28, 40], press: [287, 76, 28], business: [347, 30, 20] };
const HOME_NAME: Record<GroupId, string> = { people: 'SCHOOL', law: 'TOWN HALL', press: 'BUGLE', business: 'CHAD' };

export function Town({ s, pulse, scene, burst }: { s: State; pulse?: Pulse | null; scene?: string | null; burst?: Burst | null }) {
  const has = (id: string) => s.projects.some((p) => p.id === id);
  const fresh = (id: string) => (s.projects.find((p) => p.id === id)?.builtMonth === s.month ? 'built fresh' : 'built');
  const f = s.flags;
  const night = s.day >= 7;
  const sky = SKY[Math.min(6, s.day - 1)]!;
  const geese = (f.gooseGrudge && !has('pond') ? 3 : 0) + (has('pond') ? 3 : 1);
  const O = { stroke: INK, 'stroke-width': 2, 'stroke-linejoin': 'round' as const };
  const win = night ? '#F7D774' : '#F2EBDD';
  const walkers = Math.max(1, Math.round(s.approval.people / 18));
  const cars = Math.max(0, Math.round(s.approval.business / 28));
  const town = (s.profile?.town ?? 'Bad Town').toUpperCase();
  return (
    <svg class={`town ${burst && burst.skill === 0 ? 'quake' : ''}`} key={burst && burst.skill === 0 ? burst.key : 0} viewBox="0 0 400 170" role="img" aria-label={`${s.profile?.town ?? 'The town'}. Built: ${s.projects.map((p) => p.id).join(', ') || 'nothing yet'}.`}>
      <rect width="400" height="170" fill={sky} />
      {night ? <><circle cx="340" cy="30" r="14" fill="#F2EBDD" /><circle cx="346" cy="26" r="12" fill={sky} />{[30, 80, 140, 200, 260, 300, 370].map((x, i) => <circle key={x} class="blink" style={{ 'animation-delay': `${i * 0.3}s`, 'animation-duration': '3s' }} cx={x} cy={12 + ((i * 17) % 34)} r="1.4" fill="#F2EBDD" />)}</>
        : <g class="sun"><circle cx={60 + s.day * 45} cy={s.day > 4 ? 50 : 28} r="15" fill="#F7D774" stroke={INK} stroke-width="2" /></g>}
      {(f.moon || f.moonSold) && <g class="built" transform="translate(28 26)"><circle r="11" fill="#F2EBDD" stroke={INK} stroke-width="1.6" /><circle cx="-3" cy="-2" r="2.5" fill="#D9CDB6" /><circle cx="4" cy="4" r="1.8" fill="#D9CDB6" /><path d="M2 -10 v-12 l10 3 l-10 3" fill={f.moonSold ? '#3F8F5A' : '#C23B3B'} stroke={INK} stroke-width="1.4" stroke-linejoin="round" /></g>}
      {f.fireworks && [[120, 26, '#D9653B'], [250, 18, '#F7D774'], [180, 34, '#3B6FB6']].map(([x, y, c], i) => <g key={i} class="firework" style={{ 'animation-delay': `${i * 0.9}s` }} transform={`translate(${x} ${y})`}>{[0, 45, 90, 135, 180, 225, 270, 315].map((r) => <path key={r} d="M0 -4 v-7" stroke={c as string} stroke-width="2.2" stroke-linecap="round" transform={`rotate(${r})`} />)}</g>)}
      <g class="cloud"><path d="M40 40 q-10 0 -9 -8 q1 -7 9 -6 q4 -8 13 -5 q8 3 6 11 q6 2 3 8z" fill="#fff" opacity=".85" /></g>
      <g class="cloud slow"><path d="M40 62 q-8 0 -7 -6 q1 -6 7 -5 q3 -6 10 -4 q6 2 5 9 q5 2 2 6z" fill="#fff" opacity=".6" /></g>
      <path d="M0 110 q60 -40 130 -14 q60 -34 130 -8 q70 -30 140 6 v76 h-400z" fill={night ? '#3D5A47' : '#9DBF8A'} />
      {/* helicopter */}
      {has('helicopter') && <g class={`${fresh('helicopter')} heli`}><g transform="translate(300 26)"><ellipse cx="0" cy="0" rx="16" ry="8" fill="#3B6FB6" {...O} /><path d="M14 -2 l18 -4 l0 5z" fill="#3B6FB6" {...O} /><path d="M-22 -11 h44" stroke={INK} stroke-width="2.5" stroke-linecap="round" /><path d="M0 -11 v4" stroke={INK} stroke-width="2" /><path d="M-10 -2 h8 v5 h-8z" fill="#CFE3EE" {...O} /><path d="M-8 12 h18 M-4 8 v4 M6 8 v4" stroke={INK} stroke-width="2" /></g></g>}
      {f.rocket && <g class="built" transform="translate(92 96) rotate(24)"><path d="M-6 0 v-26 q6 -12 12 0 v26z" fill="#F2EBDD" {...O} /><path d="M-6 0 l-7 6 v-12z M6 0 l7 6 v-12z" fill="#C23B3B" {...O} /><circle cx="0" cy="-18" r="3.5" fill="#7FB7D9" {...O} /><g class="smoke"><circle cx="0" cy="8" r="5" fill="#fff" opacity=".8" /><circle cx="5" cy="14" r="4" fill="#fff" opacity=".6" /></g></g>}
      {/* school */}
      <g transform="translate(18 74)">
        {has('school') ? <g class={fresh('school')}><rect x="0" y="6" width="74" height="40" fill="#D9653B" {...O} /><path d="M-4 8 l41 -22 l41 22z" fill="#8A3B22" {...O} /><rect x="30" y="26" width="14" height="20" fill="#5C3A2A" {...O} />{[8, 54].map((x) => <rect key={x} x={x} y="18" width="12" height="12" fill={win} {...O} />)}<path d="M37 -14 v-12 l12 4 l-12 4" fill="#F7D774" {...O} /></g>
          : <g><rect x="12" y="20" width="44" height="26" fill="#C9B8A0" {...O} /><path d="M8 22 l26 -12 l26 12z" fill="#8C7A64" {...O} /><rect x="28" y="32" width="10" height="14" fill="#5C3A2A" {...O} /></g>}
      </g>
      {/* library / casino */}
      <g transform="translate(104 70)">
        <rect x="0" y="12" width="62" height="38" fill="#E6DBC6" {...O} /><path d="M-3 12 h68 l-6 -10 h-56z" fill="#B8A98C" {...O} />
        {[8, 22, 36, 50].map((x) => <rect key={x} x={x} y="18" width="5" height="32" fill="#fff" {...O} />)}
        {has('casino') && <g class={fresh('casino')}><rect x="6" y="-12" width="50" height="16" rx="3" fill="#C23B3B" {...O} /><text x="31" y="0" text-anchor="middle" font-size="10" font-weight="700" fill="#F7D774" font-family="Fredoka, sans-serif">CASINO</text>{[10, 22, 34, 46].map((x, i) => <circle key={x} class="blink" style={{ 'animation-delay': `${i * 0.2}s` }} cx={x + 3} cy="-15" r="2.4" fill="#F7D774" stroke={INK} stroke-width="1" />)}</g>}
      </g>
      {/* city hall */}
      <g transform="translate(176 52)">
        <rect x="0" y="24" width="70" height="46" fill="#F2EBDD" {...O} /><path d="M-5 24 l40 -22 l40 22z" fill="#C9B8A0" {...O} />
        <rect x="27" y="-14" width="16" height="18" fill="#F2EBDD" {...O} /><circle cx="35" cy="-5" r="5" fill="#fff" {...O} /><path d="M35 -5 v-3 M35 -5 h2" stroke={INK} stroke-width="1.5" />
        <path d="M35 -14 v-12 l12 4 l-12 4" fill="#C23B3B" {...O} />
        {[8, 22, 42, 56].map((x) => <rect key={x} x={x} y="30" width="6" height="40" fill="#fff" {...O} />)}
        <rect x="29" y="48" width="12" height="22" fill="#5C3A2A" {...O} />
        {f.billboard && <g class="built"><rect x="-8" y="6" width="30" height="15" fill="#F7D774" {...O} /><text x="7" y="12.5" text-anchor="middle" font-size="5.5" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">TRUST</text><text x="7" y="19" text-anchor="middle" font-size="5.5" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">CHAD</text></g>}
        {f.pigeon && <g class="goose" transform="translate(58 20)"><ellipse cx="0" cy="0" rx="5" ry="3.5" fill="#8C8577" stroke={INK} stroke-width="1.3" /><circle cx="4" cy="-4" r="2.6" fill="#8C8577" stroke={INK} stroke-width="1.3" /><path d="M6.5 -4 l3 1 l-3 1z" fill="#E8943A" /></g>}
        {night && <path d="M-6 26 q20 10 41 0 q21 10 41 0" fill="none" stroke="#C23B3B" stroke-width="2" />}
        {night && [0, 10, 20, 30, 41, 51, 61, 71].map((x, i) => <circle key={x} class="blink" style={{ 'animation-delay': `${i * 0.15}s` }} cx={x - 5} cy={i % 4 === 2 ? 31 : 28} r="2" fill={['#F7D774', '#D9653B', '#3F8F5A', '#3B6FB6'][i % 4]} />)}
      </g>
      {/* Bugle + TV */}
      <g transform="translate(262 76)">
        <rect x="0" y="6" width="50" height="40" fill="#B0892A" {...O} /><rect x="6" y="12" width="38" height="9" fill="#F2EBDD" {...O} /><text x="25" y="19.5" text-anchor="middle" font-size="7" font-weight="700" fill={INK} font-family="serif">THE BUGLE</text>
        <rect x="8" y="26" width="10" height="10" fill={win} {...O} /><rect x="32" y="26" width="10" height="10" fill={win} {...O} /><rect x="20" y="30" width="10" height="16" fill="#5C3A2A" {...O} />
        {f.bearClaim && <g class="built" transform="translate(58 34)"><ellipse cx="0" cy="2" rx="9" ry="11" fill="#7A5234" {...O} /><circle cx="0" cy="-12" r="7" fill="#7A5234" {...O} /><circle cx="-5" cy="-18" r="2.5" fill="#7A5234" {...O} /><circle cx="5" cy="-18" r="2.5" fill="#7A5234" {...O} /><circle cx="-2.5" cy="-13" r="1" fill={INK} /><circle cx="2.5" cy="-13" r="1" fill={INK} /><ellipse cx="0" cy="-10" rx="2.5" ry="1.8" fill="#E6C9A8" /></g>}
        {has('tv') && <g class={fresh('tv')}><path d="M25 6 v-26 M17 -8 l8 -8 l8 8 M13 -18 h24" stroke={INK} stroke-width="2.5" fill="none" stroke-linecap="round" /><circle class="blink" cx="25" cy="-22" r="3" fill="#C23B3B" stroke={INK} stroke-width="1" /></g>}
      </g>
      {/* Chad tower + billboards */}
      <g transform="translate(330 46)">
        <rect x="0" y="0" width="34" height="76" fill="#3F8F5A" {...O} />{[6, 20].map((x) => [8, 22, 36, 50].map((y) => <rect key={`${x}${y}`} x={x} y={y} width="8" height="8" fill={win} stroke={INK} stroke-width="1.2" />))}
        {s.approval.business > 65 && <g class="built"><rect x="-2" y="-18" width="38" height="16" fill="#F7D774" {...O} /><text x="17" y="-6.5" text-anchor="middle" font-size="8" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">CHAD</text></g>}
      </g>
      {f.statue && <g class="built" transform="translate(314 118)"><rect x="-8" y="-6" width="16" height="8" fill="#B8A98C" {...O} /><path d="M-5 -6 v-14 q5 -6 10 0 v14z" fill="#E8C55A" {...O} /><circle cx="0" cy="-27" r="6" fill="#E8C55A" {...O} /><circle cx="-2" cy="-28" r="1" fill={INK} /><path class="blink" style={{ 'animation-duration': '2.4s' }} d="M1 -28 h3" stroke={INK} stroke-width="1.4" /><path d="M5 -18 l7 -8" stroke="#E8C55A" stroke-width="3.5" stroke-linecap="round" /><path d="M5 -18 l7 -8" stroke={INK} stroke-width="1" /></g>}
      {/* welcome sign */}
      <g transform="translate(4 116)"><path d="M8 0 v14 M52 0 v14" stroke={INK} stroke-width="2" /><rect x="0" y="-12" width="60" height="14" rx="2" fill="#F2EBDD" {...O} /><text x="30" y="-6.5" text-anchor="middle" font-size="4.2" fill={INK} font-family="Fredoka, sans-serif">WELCOME TO</text><text x="30" y="-0.8" text-anchor="middle" font-size={town.length > 11 ? 5 : 6.5} font-weight="700" fill={INK} font-family="Fredoka, sans-serif">{town.slice(0, 16)}</text>{f.speedTrap && <g class="built"><path d="M40 -12 q8 -12 16 0z" fill="#27497A" {...O} /><circle cx="45" cy="-13" r="1.2" fill="#fff" /><circle cx="51" cy="-13" r="1.2" fill="#fff" /></g>}</g>
      {f.goodLuck && <g class="built" transform="translate(366 120)"><path d="M14 0 v12" stroke={INK} stroke-width="2" /><rect x="0" y="-10" width="30" height="12" rx="2" fill="#F7D774" {...O} transform="rotate(-6)" /><text x="15" y="-2" text-anchor="middle" font-size="5" font-weight="700" fill={INK} font-family="Fredoka, sans-serif" transform="rotate(-6)">GOOD LUCK</text></g>}
      {s.decrees.length > 0 && <g class="built" transform="translate(228 148)"><path d="M2 18 v8 M20 18 v8" stroke={INK} stroke-width="2" /><rect x="-2" y="0" width="26" height="19" rx="2" fill="#B58D55" {...O} />{s.decrees.slice(0, 6).map((id, i) => <rect key={id} x={1 + (i % 3) * 7.5} y={2 + Math.floor(i / 3) * 8} width="6" height="7" fill={['#fff', '#F7D774', '#F6DAD3'][i % 3]} stroke={INK} stroke-width=".9" transform={`rotate(${(i % 2 ? 4 : -5)} ${4 + (i % 3) * 7.5} ${5 + Math.floor(i / 3) * 8})`} />)}</g>}
      {/* walkers */}
      {!night && Array.from({ length: walkers }, (_, i) => <g key={i} class={`walker ${i % 2 ? 'rev' : ''}`} style={{ 'animation-duration': `${16 + i * 5}s`, 'animation-delay': `${-i * 4}s` }}><g class="hop" style={{ 'animation-delay': `${i * 0.13}s` }}><path d="M-3 126 q3 -9 6 0z" fill={['#D9653B', '#3B6FB6', '#B0892A', '#7A5C9C', '#3F8F5A'][i % 5]} stroke={INK} stroke-width="1.3" /><circle cx="0" cy="114.5" r="3" fill={['#F0C4A0', '#B9794E', '#E2A878', '#8A5A3C'][i % 4]} stroke={INK} stroke-width="1.3" />{s.approval.people < 35 && <path d="M-2 110 l4 0" stroke="#C23B3B" stroke-width="1.5" />}</g></g>)}
      {/* road */}
      <path d="M0 132 h400 v16 h-400z" fill="#6B6257" stroke={INK} stroke-width="2" /><path d="M8 140 h384" stroke="#F2EBDD" stroke-width="2" stroke-dasharray="14 12" />
      {f.kevin && <g class="built" transform="translate(126 140)"><ellipse cx="0" cy="0" rx="13" ry="5" fill={INK} /><ellipse cx="0" cy="-1" rx="10" ry="3" fill="#3A322C" /><path d="M12 -2 v-12 l11 3 l-11 3" fill="#F2EBDD" stroke={INK} stroke-width="1.3" stroke-linejoin="round" /><text x="17" y="-9.2" text-anchor="middle" font-size="3.6" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">KEVIN</text></g>}
      {f.roundabout && !f.roundaboutFixed && <g class="built" transform="translate(214 140)"><ellipse cx="0" cy="0" rx="26" ry="9" fill="#6B6257" stroke={INK} stroke-width="2" /><ellipse cx="0" cy="0" rx="11" ry="3.5" fill="#9DBF8A" stroke={INK} stroke-width="1.5" />{[0, 1, 2, 3].map((i) => <g key={i} class="orbit" style={{ 'animation-delay': `${-i * 1.5}s` }}><g transform="scale(.5)"><Car color={['#D9653B', '#E8C55A', '#3B6FB6', '#F2EBDD'][i]!} /></g></g>)}</g>}
      {!f.flood && Array.from({ length: cars }, (_, i) => <g key={i} class={`drive ${i % 2 ? 'rev' : ''}`} style={{ 'animation-duration': `${9 + i * 4}s`, 'animation-delay': `${-i * 3.3}s` }}><g transform={`translate(0 ${i % 2 ? 145 : 138}) scale(.62)`}><Car color={['#D9653B', '#3F8F5A', '#E8C55A', '#F2EBDD'][i % 4]!} /></g></g>)}
      {!f.flood && s.approval.law >= 50 && <g class="drive" style={{ 'animation-duration': '13s', 'animation-delay': '-6s' }}><g transform="translate(0 138) scale(.62)"><Car color="#3B6FB6" police /></g></g>}
      {f.flood && <g class="built"><path class="wave" d="M-20 128 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 v24 h-440z" fill="#7FB7D9" opacity=".88" stroke={INK} stroke-width="1.6" /><g class="drive" style={{ 'animation-duration': '22s' }}><g transform="translate(0 136)"><path d="M-16 0 q16 8 32 0 l4 -6 l-4 2 h-28 l-4 -2z" fill={INK} /><path d="M4 -2 v-14" stroke={INK} stroke-width="1.6" /><circle cx="4" cy="-18" r="3" fill="#F0C4A0" stroke={INK} stroke-width="1.2" /></g></g></g>}
      {f.paved && !has('pond') && <g class="built"><rect x="14" y="150" width="96" height="16" fill="#8C8577" {...O} />{[26, 46, 66, 86].map((x) => <path key={x} d={`M${x} 151 v14`} stroke="#F2EBDD" stroke-width="1.4" />)}</g>}
      {f.market && <g class="built" transform="translate(258 150)">{[0, 26].map((x, i) => <g key={x} transform={`translate(${x} 0)`}><rect x="0" y="2" width="20" height="10" fill="#C8A26A" {...O} /><path d="M-2 2 l4 -8 h16 l4 8z" fill={i ? '#3F8F5A' : '#C23B3B'} {...O} /><path d="M5 -6 l-2 8 M10 -6 v8 M15 -6 l2 8" stroke="#F2EBDD" stroke-width="2" /><circle cx="6" cy="6" r="2" fill="#E8943A" /><circle cx="13" cy="6" r="2" fill="#E8943A" /></g>)}</g>}
      {(f.monster || f.monsterFriend) && <g class="built" transform="translate(340 158)"><ellipse cx="0" cy="2" rx="34" ry="7" fill="#7FB7D9" {...O} /><g class="peek"><path d="M-4 2 q-4 -22 6 -24 q9 0 8 8 q-6 -2 -6 4 v12z" fill="#5FA77A" {...O} /><circle cx="4" cy="-17" r="1.5" fill={INK} />{f.monsterFriend && <path d="M14 -26 q3 -4 6 0 q3 -4 6 0 q0 5 -6 8 q-6 -3 -6 -8z" fill="#C23B3B" stroke={INK} stroke-width="1" transform="scale(.6) translate(12 -22)" />}</g><path d="M14 2 q4 -8 8 0" fill="#5FA77A" {...O} /></g>}
      {f.frogs && [150, 176, 300].map((x, i) => <g key={x} class="frog" style={{ 'animation-delay': `${i * 0.4}s` }} transform={`translate(${x} 160)`}><ellipse cx="0" cy="0" rx="5" ry="3.5" fill="#5FA77A" stroke={INK} stroke-width="1.3" /><circle cx="-2.5" cy="-3.5" r="1.6" fill="#fff" stroke={INK} stroke-width=".8" /><circle cx="2.5" cy="-3.5" r="1.6" fill="#fff" stroke={INK} stroke-width=".8" /></g>)}
      {f.wetSock && <g class="goose" transform="translate(112 126)"><path d="M-4 -16 h8 v12 q8 0 8 5 q0 4 -6 4 h-10z" fill="#9CC9E8" {...O} /><path d="M-4 -13 h8" stroke="#C23B3B" stroke-width="2" /><circle cx="-1" cy="-8" r="1" fill={INK} /><circle cx="3" cy="-8" r="1" fill={INK} /><path d="M-2 8 q0 4 -2 5 M6 8 q0 4 2 5" stroke="#7FB7D9" stroke-width="1.5" fill="none" /></g>}
      {f.gooseGuard && <g class="built" transform="translate(98 134)"><rect x="-2" y="-22" width="12" height="8" rx="2" fill="#C23B3B" stroke={INK} stroke-width="1.3" /><text x="4" y="-16" text-anchor="middle" font-size="4" font-weight="700" fill="#fff" font-family="Fredoka, sans-serif">NO</text><path d="M4 -14 v8" stroke={INK} stroke-width="1.5" /></g>}
      {f.raccoons && s.approval.law >= 35 && <g class="built" transform="translate(372 150)"><ellipse cx="0" cy="0" rx="9" ry="6" fill="#B8B1A4" stroke={INK} stroke-width="1.6" /><circle cx="-8" cy="-5" r="5" fill="#B8B1A4" stroke={INK} stroke-width="1.6" /><path d="M-11 -6 h6" stroke={INK} stroke-width="3" /><path d="M8 -2 q8 -4 8 -12" stroke={INK} stroke-width="4" fill="none" stroke-linecap="round" /></g>}
      {/* pond */}
      {has('pond') && <g class={fresh('pond')}><ellipse cx="70" cy="158" rx="46" ry="9" fill="#7FB7D9" {...O} /><path d="M52 157 q5 -3 10 0 M76 160 q5 -3 10 0" stroke="#fff" stroke-width="1.5" fill="none" /></g>}
      {/* spoon */}
      {has('spoon') && <g class={fresh('spoon')} transform="translate(171 104) rotate(6) scale(.85)"><ellipse cx="0" cy="-10" rx="11" ry="15" fill="#D8DDE0" {...O} /><rect x="-3" y="4" width="6" height="52" rx="3" fill="#D8DDE0" {...O} /><ellipse cx="-3" cy="-13" rx="3" ry="6" fill="#fff" opacity=".7" /></g>}
      {/* geese */}
      {Array.from({ length: geese }, (_, i) => {
        const x = has('pond') ? 40 + i * 18 : f.gooseGrudge ? 122 + i * 16 : 150;
        return <g key={i} class="goose" style={{ 'animation-delay': `${i * 0.3}s` }} transform={`translate(${x} ${has('pond') ? 152 : 126})`}><ellipse cx="0" cy="0" rx="7" ry="4.5" fill="#fff" stroke={INK} stroke-width="1.6" /><path d="M5 -1 q3 -8 1 -11" stroke={INK} stroke-width="4.5" fill="none" stroke-linecap="round" /><path d="M5 -1 q3 -8 1 -11" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" /><path d="M7 -12 l5 1 l-5 2z" fill="#E8943A" stroke={INK} stroke-width="1" /></g>;
      })}
      {/* trouble overlays */}
      {s.approval.law < 35 && <g class="built"><path d="M110 112 q5 -7 10 0 t10 0 t10 0 t10 0" stroke="#C23B3B" stroke-width="2.5" fill="none" stroke-linecap="round" /><g transform="translate(372 150)"><ellipse cx="0" cy="0" rx="9" ry="6" fill="#B8B1A4" stroke={INK} stroke-width="1.6" /><circle cx="-8" cy="-5" r="5" fill="#B8B1A4" stroke={INK} stroke-width="1.6" /><path d="M-11 -6 h6" stroke={INK} stroke-width="3" /><path d="M8 -2 q8 -4 8 -12" stroke={INK} stroke-width="4" fill="none" stroke-linecap="round" /></g></g>}
      {scene && [0, 1, 2, 3, 4, 5].map((i) => <g key={`${scene}${i}`} class={`parade ${i % 2 ? 'rev' : ''}`} style={{ 'animation-delay': `${-i * 0.9}s` }}><g class="hop" style={{ 'animation-delay': `${i * 0.11}s`, 'animation-duration': '.35s' }}><g transform={`translate(0 ${112 + (i % 3) * 9}) scale(.62)`}>{spriteBody(scene)}</g></g></g>)}
      {/* each group's building wears its mood: a gauge, and a badge when things are very bad or very good */}
      {GROUPS.map((g) => {
        const [x, y, hw] = HOME[g];
        const v = s.approval[g];
        const low = v < 35, high = v >= 65;
        return (
          <g key={g}>
            {low && <rect class="gloom" x={x - hw} y={y} width={hw * 2} height={122 - y} rx="3" fill={INK} opacity=".3" />}
            {low && <g class="hop" transform={`translate(${x} ${y - 12})`}><circle r="8" fill="#C23B3B" stroke={INK} stroke-width="1.6" /><text y="4" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="Fredoka, sans-serif">!</text></g>}
            {high && <g class="hop" transform={`translate(${x} ${y - 12}) scale(.38)`}><g transform="translate(-22 -22)">{spriteBody('star')}</g></g>}
            <g transform={`translate(${x - 19} 123)`}>
              <rect width="38" height="9" rx="4.5" fill="#FBF7EE" stroke={INK} stroke-width="1.3" />
              <rect x="1.5" y="1.5" width={Math.max(2, (35 * v) / 100)} height="6" rx="3" fill={low ? '#C23B3B' : GROUP_COLOR[g]} class="moodfill" />
              <text x="19" y="6.8" text-anchor="middle" font-size="5" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">{HOME_NAME[g]}</text>
            </g>
          </g>
        );
      })}
      {scene && [0, 1, 2, 3, 4, 5].map((i) => <g key={`${scene}${i}`} class={`parade ${i % 2 ? 'rev' : ''}`} style={{ 'animation-delay': `${-i * 0.9}s` }}><g class="hop" style={{ 'animation-delay': `${i * 0.11}s`, 'animation-duration': '.35s' }}><g transform={`translate(0 ${118 + (i % 3) * 9}) scale(.62)`}>{spriteBody(scene)}</g></g></g>)}
      {pulse && GROUPS.filter((g) => pulse.effects[g]).map((g) => {
        const up = pulse.effects[g]! > 0;
        const [x, y, hw] = HOME[g];
        return (
          <g key={`${pulse.key}${g}`}>
            <ellipse class="halo" cx={x} cy={(y + 122) / 2} rx={hw + 10} ry={(122 - y) / 2 + 10} fill={up ? '#3F8F5A' : '#C23B3B'} />
            {[0, 1, 2, 3].map((i) => <g key={i} class="emote" style={{ 'animation-delay': `${i * 0.16}s` }} transform={`translate(${x + (i - 1.5) * 13} ${y + 6})`}>{up ? <path d="M0 5 q-9 -6 -9 -11 q0 -5 4.5 -5 q3 0 4.5 3 q1.5 -3 4.5 -3 q4.5 0 4.5 5 q0 5 -9 11z" fill={GROUP_COLOR[g]} stroke={INK} stroke-width="1.5" /> : <g><circle r="7.5" fill="#F6DAD3" stroke={INK} stroke-width="1.5" /><path d="M-3.5 -3.5 l7 7 M3.5 -3.5 l-7 7" stroke="#C23B3B" stroke-width="2.4" stroke-linecap="round" /></g>}</g>)}
            <g class="emote big" transform={`translate(${x} ${y - 2})`}><rect x="-17" y="-10" width="34" height="18" rx="9" fill={up ? '#DCEBDD' : '#F6DAD3'} stroke={INK} stroke-width="1.6" /><text y="3.5" text-anchor="middle" font-size="11" font-weight="700" fill={up ? '#2C6B41' : '#C23B3B'} font-family="Fredoka, sans-serif">{up ? '+' : '−'}{Math.abs(pulse.effects[g]!)}</text></g>
          </g>
        );
      })}
      {burst && burst.skill === 2 && Array.from({ length: 22 }, (_, i) => <rect key={`${burst.key}c${i}`} class="confetti" style={{ 'animation-delay': `${(i % 7) * 0.09}s` }} x={12 + i * 17.5} y={-8} width="5" height="8" rx="1" fill={['#D9653B', '#3F8F5A', '#3B6FB6', '#E8C55A'][i % 4]} transform={`rotate(${i * 37} ${12 + i * 17.5} -4)`} />)}
      {burst && burst.skill === 0 && [60, 140, 215, 290, 350].map((x, i) => <g key={`${burst.key}s${i}`} class="smokeup" style={{ 'animation-delay': `${i * 0.12}s` }} transform={`translate(${x} ${96 + (i % 2) * 14})`}><circle r="11" fill="#6B6257" opacity=".85" /><circle cx="9" cy="-7" r="8" fill="#8C8577" opacity=".85" /><circle cx="-8" cy="-5" r="7" fill="#8C8577" opacity=".85" /></g>)}
      {s.approval.people < 35 && <g class="built">{[22, 40, 58].map((x, i) => <g key={x} class="goose" style={{ 'animation-delay': `${i * 0.2}s` }} transform={`translate(${x} 128)`}><rect x="-7" y="-22" width="14" height="10" fill="#fff" stroke={INK} stroke-width="1.5" /><path d="M0 -12 v12" stroke={INK} stroke-width="2" /><circle cx="0" cy="2" r="3.5" fill="#D9653B" stroke={INK} stroke-width="1.5" /><path d="M-4 -17 h8" stroke="#C23B3B" stroke-width="2" /></g>)}</g>}
    </svg>
  );
}
