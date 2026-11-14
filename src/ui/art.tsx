// All art is original SVG authored here: flat paper cut-out shapes with a dark outline.
import type { ComponentChildren } from 'preact';
import type { GroupId, State } from '../engine/types.ts';

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

// ---------- icons ----------
export const Icon = {
  ticket: (p: { size?: number }) => (
    <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4z" fill="#E8C55A" stroke={INK} stroke-width="2" stroke-linejoin="round" /><path d="M14 8v10" stroke={INK} stroke-width="2" stroke-dasharray="2 2" /></svg>
  ),
  coin: (p: { size?: number }) => (
    <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#E8C55A" stroke={INK} stroke-width="2" /><path d="M12 7v10M9.5 9.5q2.5 -2 5 0q0 2.5 -2.5 2.500q-2.5 0 -2.5 2.500q2.5 2 5 0" fill="none" stroke={INK} stroke-width="1.8" stroke-linecap="round" /></svg>
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

export function Town({ s }: { s: State }) {
  const has = (id: string) => s.projects.some((p) => p.id === id);
  const fresh = (id: string) => (s.projects.find((p) => p.id === id)?.builtMonth === s.month ? 'built fresh' : 'built');
  const night = s.day >= 7;
  const sky = SKY[Math.min(6, s.day - 1)]!;
  const geese = (s.flags.gooseGrudge && !has('pond') ? 5 : 0) + (has('pond') ? 3 : 1);
  const O = { stroke: INK, 'stroke-width': 2, 'stroke-linejoin': 'round' as const };
  const win = night ? '#F7D774' : '#F2EBDD';
  return (
    <svg class="town" viewBox="0 0 400 170" role="img" aria-label={`The town. Projects built: ${s.projects.map((p) => p.id).join(', ') || 'none'}.`}>
      <rect width="400" height="170" fill={sky} />
      {night ? <><circle cx="340" cy="30" r="14" fill="#F2EBDD" /><circle cx="346" cy="26" r="12" fill={sky} />{[30, 80, 140, 200, 260, 300, 370].map((x, i) => <circle key={x} cx={x} cy={12 + ((i * 17) % 34)} r="1.4" fill="#F2EBDD" />)}</>
        : <circle cx={60 + s.day * 45} cy={s.day > 4 ? 50 : 28} r="15" fill="#F7D774" stroke={INK} stroke-width="2" />}
      <g class="cloud"><path d="M40 40 q-10 0 -9 -8 q1 -7 9 -6 q4 -8 13 -5 q8 3 6 11 q6 2 3 8z" fill="#fff" opacity=".85" /></g>
      <path d="M0 110 q60 -40 130 -14 q60 -34 130 -8 q70 -30 140 6 v76 h-400z" fill={night ? '#3D5A47' : '#9DBF8A'} />
      {/* helicopter */}
      {has('helicopter') && <g class={`${fresh('helicopter')} heli`}><g transform="translate(300 26)"><ellipse cx="0" cy="0" rx="16" ry="8" fill="#3B6FB6" {...O} /><path d="M14 -2 l18 -4 l0 5z" fill="#3B6FB6" {...O} /><path d="M-22 -11 h44" stroke={INK} stroke-width="2.5" stroke-linecap="round" /><path d="M0 -11 v4" stroke={INK} stroke-width="2" /><path d="M-10 -2 h8 v5 h-8z" fill="#CFE3EE" {...O} /><path d="M-8 12 h18 M-4 8 v4 M6 8 v4" stroke={INK} stroke-width="2" /></g></g>}
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
        {night && <path d="M-6 26 q20 10 41 0 q21 10 41 0" fill="none" stroke="#C23B3B" stroke-width="2" />}
        {night && [0, 10, 20, 30, 41, 51, 61, 71].map((x, i) => <circle key={x} class="blink" style={{ 'animation-delay': `${i * 0.15}s` }} cx={x - 5} cy={i % 4 === 2 ? 31 : 28} r="2" fill={['#F7D774', '#D9653B', '#3F8F5A', '#3B6FB6'][i % 4]} />)}
      </g>
      {/* Bugle + TV */}
      <g transform="translate(262 76)">
        <rect x="0" y="6" width="50" height="40" fill="#B0892A" {...O} /><rect x="6" y="12" width="38" height="9" fill="#F2EBDD" {...O} /><text x="25" y="19.5" text-anchor="middle" font-size="7" font-weight="700" fill={INK} font-family="serif">THE BUGLE</text>
        <rect x="8" y="26" width="10" height="10" fill={win} {...O} /><rect x="32" y="26" width="10" height="10" fill={win} {...O} /><rect x="20" y="30" width="10" height="16" fill="#5C3A2A" {...O} />
        {has('tv') && <g class={fresh('tv')}><path d="M25 6 v-26 M17 -8 l8 -8 l8 8 M13 -18 h24" stroke={INK} stroke-width="2.5" fill="none" stroke-linecap="round" /><circle class="blink" cx="25" cy="-22" r="3" fill="#C23B3B" stroke={INK} stroke-width="1" /></g>}
      </g>
      {/* Chad tower + billboards */}
      <g transform="translate(330 46)">
        <rect x="0" y="0" width="34" height="76" fill="#3F8F5A" {...O} />{[6, 20].map((x) => [8, 22, 36, 50].map((y) => <rect key={`${x}${y}`} x={x} y={y} width="8" height="8" fill={win} stroke={INK} stroke-width="1.2" />))}
        {s.approval.business > 65 && <g class="built"><rect x="-2" y="-18" width="38" height="16" fill="#F7D774" {...O} /><text x="17" y="-6.5" text-anchor="middle" font-size="8" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">CHAD</text></g>}
      </g>
      {/* road */}
      <path d="M0 132 h400 v16 h-400z" fill="#6B6257" stroke={INK} stroke-width="2" /><path d="M8 140 h384" stroke="#F2EBDD" stroke-width="2" stroke-dasharray="14 12" />
      {/* pond */}
      {has('pond') && <g class={fresh('pond')}><ellipse cx="70" cy="158" rx="46" ry="9" fill="#7FB7D9" {...O} /><path d="M52 157 q5 -3 10 0 M76 160 q5 -3 10 0" stroke="#fff" stroke-width="1.5" fill="none" /></g>}
      {/* spoon */}
      {has('spoon') && <g class={fresh('spoon')} transform="translate(228 100) rotate(8)"><ellipse cx="0" cy="-10" rx="11" ry="15" fill="#D8DDE0" {...O} /><rect x="-3" y="4" width="6" height="52" rx="3" fill="#D8DDE0" {...O} /><ellipse cx="-3" cy="-13" rx="3" ry="6" fill="#fff" opacity=".7" /></g>}
      {/* geese */}
      {Array.from({ length: geese }, (_, i) => {
        const x = has('pond') ? 40 + i * 18 : s.flags.gooseGrudge ? 120 + i * 20 : 150;
        return <g key={i} class="goose" style={{ 'animation-delay': `${i * 0.3}s` }} transform={`translate(${x} ${has('pond') ? 152 : 126})`}><ellipse cx="0" cy="0" rx="7" ry="4.5" fill="#fff" stroke={INK} stroke-width="1.6" /><path d="M5 -1 q3 -8 1 -11" stroke={INK} stroke-width="4.5" fill="none" stroke-linecap="round" /><path d="M5 -1 q3 -8 1 -11" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" /><path d="M7 -12 l5 1 l-5 2z" fill="#E8943A" stroke={INK} stroke-width="1" /></g>;
      })}
      {/* trouble overlays */}
      {s.approval.law < 35 && <g class="built"><path d="M108 108 q6 -8 12 0 t12 0 t12 0" stroke="#C23B3B" stroke-width="3" fill="none" stroke-linecap="round" /><text x="184" y="118" font-size="9" font-weight="700" fill="#C23B3B" font-family="Fredoka, sans-serif" transform="rotate(-6 184 118)">BARB WUZ HERE</text><g transform="translate(372 150)"><ellipse cx="0" cy="0" rx="9" ry="6" fill="#B8B1A4" stroke={INK} stroke-width="1.6" /><circle cx="-8" cy="-5" r="5" fill="#B8B1A4" stroke={INK} stroke-width="1.6" /><path d="M-11 -6 h6" stroke={INK} stroke-width="3" /><path d="M8 -2 q8 -4 8 -12" stroke={INK} stroke-width="4" fill="none" stroke-linecap="round" /></g></g>}
      {s.approval.people < 35 && <g class="built">{[150, 168, 186].map((x, i) => <g key={x} class="goose" style={{ 'animation-delay': `${i * 0.2}s` }} transform={`translate(${x} 128)`}><rect x="-7" y="-22" width="14" height="10" fill="#fff" stroke={INK} stroke-width="1.5" /><path d="M0 -12 v12" stroke={INK} stroke-width="2" /><circle cx="0" cy="2" r="3.5" fill="#D9653B" stroke={INK} stroke-width="1.5" /><path d="M-4 -17 h8" stroke="#C23B3B" stroke-width="2" /></g>)}</g>}
    </svg>
  );
}
