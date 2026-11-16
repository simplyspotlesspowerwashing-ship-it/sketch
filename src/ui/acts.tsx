// The little scenes that play on the town after a card: one per group that moved, at that group's
// building. Drawn in the town's own coordinates (viewBox 0 0 400 170); animated with CSS (styles.css, "acts").
import type { ComponentChildren } from 'preact';
import { GROUP_COLOR, HOME, INK } from './art.tsx';
import type { GroupId, MeterId } from '../engine/types.ts';

const O = { stroke: INK, 'stroke-width': 1.5, 'stroke-linejoin': 'round' as const, 'stroke-linecap': 'round' as const };
const SKIN = ['#F0C4A0', '#B9794E', '#E2A878', '#8A5A3C', '#F3D3BC'];

/** Where each act happens: the building's centre x, its roof y, and the street in front of it. */
export const STAGE: Record<MeterId, { x: number; roof: number }> = {
  people: { x: HOME.people[0], roof: HOME.people[1] },
  business: { x: HOME.business[0], roof: HOME.business[1] },
  law: { x: HOME.law[0], roof: HOME.law[1] },
  press: { x: HOME.press[0], roof: HOME.press[1] },
  treasury: { x: HOME.law[0], roof: HOME.law[1] },
};

const v = (o: Record<string, string | number>) => o as Record<string, string>;

function Person({ c, i, arms }: { c: string; i: number; arms: 'up' | 'sign' | 'none' }) {
  return (
    <g>
      <path d="M-4 0 q4 -12 8 0z" fill={c} {...O} />
      <circle cy="-12" r="3.6" fill={SKIN[i % SKIN.length]} {...O} />
      {arms === 'up' && <path d="M-3 -7 l-4 -7 M3 -7 l4 -7" {...O} fill="none" />}
      {arms === 'sign' && <g class="act-sign" style={v({ '--d': `${(i % 3) * 0.12}s` })}><path d="M3 -6 v-16" {...O} /><rect x="-5" y="-31" width="16" height="10" rx="1" fill="#fff" {...O} /><path d="M-2 -26 h10" stroke="#C23B3B" stroke-width="2" stroke-linecap="round" /></g>}
    </g>
  );
}

/** A crowd of the group's people running to the building: cheering if up, protesting if down. */
function Crowd({ g, up, x }: { g: GroupId; up: boolean; x: number }) {
  return (
    <g>
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i} transform={`translate(${Math.max(10, Math.min(390, x - 36 + i * 12))} ${i % 2 ? 147 : 142})`}>
          <g class="act-runin" style={v({ '--from': x > 200 ? '-90px' : '90px', '--d': `${i * 0.06}s` })}>
            <g class={up ? 'act-jump' : 'act-stomp'} style={v({ '--d': `${0.6 + i * 0.07}s` })}><Person c={GROUP_COLOR[g]} i={i} arms={up ? 'up' : 'sign'} /></g>
          </g>
        </g>
      ))}
    </g>
  );
}

function Confetti({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>{Array.from({ length: 16 }, (_, i) => <rect key={i} class="act-confetti" x="-2" y="-3" width="4" height="6" rx="1" fill={['#E8C55A', '#D9653B', '#3F8F5A', '#3B6FB6', '#fff'][i % 5]} stroke={INK} stroke-width=".6" style={v({ '--a': `${i * 22.5}deg`, '--dist': `${26 + (i * 7) % 18}px`, '--d': `${(i % 4) * 0.05}s` })} />)}</g>;
}
function Storm({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g class="act-cloud">
        <path d="M-18 4 q-9 0 -8 -7 q1 -6 9 -5 q3 -8 13 -6 q8 2 7 9 q8 1 6 7 q-1 3 -5 3z" fill="#6E6A78" stroke={INK} stroke-width="1.5" />
        {Array.from({ length: 7 }, (_, i) => <path key={i} class="act-rain" d={`M${-16 + i * 5} 8 l-2 7`} stroke="#4A78B8" stroke-width="1.6" stroke-linecap="round" style={v({ '--d': `${(i * 0.13) % 0.5}s` })} />)}
        <path class="act-bolt" d="M2 6 l-6 10 h5 l-3 9 l10 -13 h-5 l3 -6z" fill="#FFD84A" stroke={INK} stroke-width="1.2" />
      </g>
    </g>
  );
}
function Sunburst({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><g class="act-rays">{Array.from({ length: 10 }, (_, i) => <path key={i} d="M0 -10 L3 -34 L-3 -34z" fill="#F7D774" opacity=".75" transform={`rotate(${i * 36})`} />)}</g></g>;
}
function Badge({ x, y, d }: { x: number; y: number; d: number }) {
  const up = d > 0;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g class="act-badge">
        <rect x="-19" y="-11" width="38" height="20" rx="10" fill={up ? '#DCEBDD' : '#F6DAD3'} stroke={INK} stroke-width="1.8" />
        <text y="4.5" text-anchor="middle" font-size="13" font-weight="700" fill={up ? '#2C6B41' : '#C23B3B'} font-family="Fredoka, sans-serif">{up ? '+' : '−'}{Math.abs(d)}</text>
      </g>
    </g>
  );
}
function Halo({ x, y, up }: { x: number; y: number; up: boolean }) {
  return <ellipse class="act-halo" cx={x} cy={y} rx="46" ry="40" fill={up ? '#F7D774' : '#C23B3B'} />;
}

// ---------- group-specific business ----------
function BusinessAct({ up }: { up: boolean }) {
  const wins = [[336, 54], [350, 54], [336, 68], [350, 68], [336, 82], [350, 82], [336, 96], [350, 96]];
  return up ? (
    <g>
      {wins.map(([x, y], i) => <rect key={i} class="act-glow" x={x} y={y} width="8" height="8" fill="#FFE27A" style={v({ '--d': `${i * 0.06}s` })} />)}
      {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${340 + (i % 2) * 14} ${70 + i * 8})`}><g class="act-moneybag" style={v({ '--d': `${0.2 + i * 0.2}s`, '--dx': `${(i % 2 ? 1 : -1) * (18 + i * 4)}px` })}><path d="M-5 0 q-3 -8 2 -10 l-1 -3 h8 l-1 3 q5 2 2 10z" fill="#C8A26A" {...O} /><text y="-2" text-anchor="middle" font-size="6" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">$</text></g></g>)}
      <g transform="translate(347 128)"><g class="act-limo"><rect x="-22" y="-8" width="44" height="8" rx="3" fill={INK} /><rect x="-16" y="-12" width="26" height="5" rx="2" fill="#CFE3EE" stroke={INK} stroke-width="1" /><circle cx="-14" cy="1" r="2.6" fill="#555" /><circle cx="14" cy="1" r="2.6" fill="#555" /></g></g>
    </g>
  ) : (
    <g>
      {wins.map(([x, y], i) => <rect key={i} class="act-dark" x={x} y={y} width="8" height="8" fill="#2A2A33" style={v({ '--d': `${i * 0.09}s` })} />)}
      <g transform="translate(347 112)"><g class="act-swing"><path d="M-10 -8 l10 -6 l10 6" fill="none" stroke={INK} stroke-width="1" /><rect x="-13" y="-8" width="26" height="10" rx="1.5" fill="#C23B3B" stroke={INK} stroke-width="1.2" /><text y="0" text-anchor="middle" font-size="6" font-weight="700" fill="#fff" font-family="Fredoka, sans-serif">CLOSED</text></g></g>
      <g transform="translate(0 141)"><g class="act-tumble"><circle r="5" fill="none" stroke="#B58D55" stroke-width="1.6" /><path d="M-4 -2 q4 3 8 0 M-3 3 q3 -4 6 0 M-2 -4 q2 6 4 8" stroke="#B58D55" stroke-width="1.2" fill="none" /></g></g>
    </g>
  );
}

function LawAct({ up }: { up: boolean }) {
  const car = (
    <g><path d="M-14 0 v-6 l5 -6 h14 l6 6 h4 v6z" fill="#3B6FB6" stroke={INK} stroke-width="1.5" stroke-linejoin="round" /><path d="M-7 -6 l3 -4 h4 v4z M3 -6 v-4 h3 l3 4z" fill="#CFE3EE" stroke={INK} stroke-width="1" /><circle cx="-8" cy="1" r="3" fill={INK} /><circle cx="9" cy="1" r="3" fill={INK} /><rect class="act-siren" x="-3" y="-16" width="7" height="4" rx="1" fill="#C23B3B" stroke={INK} stroke-width="1" /></g>
  );
  const raccoon = (
    <g><ellipse cx="0" cy="-5" rx="6" ry="5" fill="#B8B1A4" {...O} /><circle cx="5" cy="-11" r="4" fill="#B8B1A4" {...O} /><path d="M2 -12 h7" stroke={INK} stroke-width="2.4" /><path d="M-6 -5 q-6 -2 -7 -8" stroke={INK} stroke-width="3" fill="none" stroke-linecap="round" /><circle cx="-6" cy="-13" r="5" fill="#C8A26A" {...O} /><text x="-6" y="-11" text-anchor="middle" font-size="5" font-weight="700" fill={INK} font-family="Fredoka, sans-serif">$</text></g>
  );
  return up ? (
    <g>
      <g transform="translate(196 142)"><g class="act-drivein">{car}</g></g>
      <g transform="translate(222 146)"><g class="act-salute"><Person c="#3B6FB6" i={1} arms="up" /></g></g>
      <g transform="translate(240 146)"><g class="act-ledaway"><g transform="scale(.9)">{raccoon}</g><path d="M-8 -6 l-6 0" stroke="#999" stroke-width="1" /></g></g>
    </g>
  ) : (
    <g>
      <g transform="translate(150 146)"><g class="act-dash">{raccoon}</g></g>
      <g transform="translate(150 146)"><g class="act-dash2">{raccoon}</g></g>
      <g transform="translate(110 140)"><g class="act-chase"><g transform="scale(.8)">{car}</g></g></g>
      <g transform="translate(232 82)"><g class="act-crack"><path d="M0 0 l4 4 l-2 4 l5 5 M4 4 l5 -1" stroke={INK} stroke-width="1.2" fill="none" /></g></g>
    </g>
  );
}

function PressAct({ up }: { up: boolean }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform="translate(287 110)">
          <g class="act-paper" style={v({ '--d': `${i * 0.14}s`, '--dx': `${(i - 2) * 30}px`, '--dy': `${-44 - (i % 3) * 14}px`, '--r': `${(i - 2) * 40}deg` })}>
            <rect x="-11" y="-8" width="22" height="15" fill="#fff" stroke={INK} stroke-width="1.2" />
            <text y="-1.5" text-anchor="middle" font-size="5" font-weight="700" fill={up ? '#2C6B41' : '#C23B3B'} font-family="Fredoka, sans-serif">{up ? ['HOORAY', 'GENIUS', 'YES!', 'HERO', 'WOW'][i] : ['OUTRAGE', 'SHAME', 'BOO', 'SCANDAL', 'WHY'][i]}</text>
            <path d="M-8 2 h16 M-8 4.5 h11" stroke="#999" stroke-width=".8" />
          </g>
        </g>
      ))}
      {[0, 1, 2].map((i) => <circle key={i} class="act-flash" cx={268 + i * 18} cy={96 - (i % 2) * 8} r="7" fill="#fff" style={v({ '--d': `${0.15 + i * 0.25}s` })} />)}
    </g>
  );
}

function TreasuryAct({ up }: { up: boolean }) {
  return up ? (
    <g>
      <g transform="translate(250 150)"><ellipse class="act-pile" cx="0" cy="0" rx="14" ry="6" fill="#E8C55A" stroke={INK} stroke-width="1.4" /></g>
      {Array.from({ length: 10 }, (_, i) => <g key={i} transform={`translate(${236 + (i * 7) % 30} 0)`}><g class="act-coinfall" style={v({ '--d': `${i * 0.09}s` })}><circle cy="0" r="4" fill="#E8C55A" stroke={INK} stroke-width="1.2" /><path d="M0 -2 v4" stroke={INK} stroke-width="1" /></g></g>)}
    </g>
  ) : (
    <g>
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform="translate(211 100)">
          <g class="act-coinfly" style={v({ '--d': `${i * 0.11}s`, '--dx': `${40 + (i * 23) % 90}px`, '--dy': `${-50 - (i * 17) % 40}px` })}>
            <path class="act-wing" d="M-3 -2 q-7 -7 -10 -2 q4 1 10 3z M3 -2 q7 -7 10 -2 q-4 1 -10 3z" fill="#fff" stroke={INK} stroke-width=".9" />
            <circle r="4" fill="#E8C55A" stroke={INK} stroke-width="1.2" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** One group's moment: glow, weather over the roof, a crowd (people groups) and the group's own gag. */
export function Act({ m, d }: { m: MeterId; d: number }) {
  const up = d > 0;
  const { x, roof } = STAGE[m];
  const extra: ComponentChildren = m === 'business' ? <BusinessAct up={up} /> : m === 'law' ? <LawAct up={up} /> : m === 'press' ? <PressAct up={up} /> : m === 'treasury' ? <TreasuryAct up={up} /> : null;
  return (
    <g class="act">
      {m !== 'treasury' && <Halo x={x} y={roof + 40} up={up} />}
      {m !== 'treasury' && (up ? <Sunburst x={x} y={roof - 4} /> : <Storm x={x} y={roof - 16} />)}
      {extra}
      {m !== 'treasury' && <Crowd g={m as GroupId} up={up} x={x} />}
      {up && m !== 'treasury' && <Confetti x={x} y={roof} />}
      <Badge x={m === 'treasury' ? x + 28 : x} y={m === 'treasury' ? roof + 6 : roof - 22} d={d} />
    </g>
  );
}
