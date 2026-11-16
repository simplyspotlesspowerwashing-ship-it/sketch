// The short clip that plays after a choice. Each choice in the pack names an act (how it moves) and
// its props (what it is about): "build" + pond and goose, "ink" + skull, skull, scone. The acts are
// the choreography; the props make each one specific. Animated in styles.css under "clips".
import type { ComponentChildren } from 'preact';
import type { Clip } from '../engine/types.ts';

const v = (o: Record<string, string | number>) => o as Record<string, string>;
const P = ({ e, cls = '', style }: { e: string; cls?: string; style?: Record<string, string | number> }) => <span class={`cl-p ${cls}`} style={style ? v(style) : undefined}>{e}</span>;
const many = (n: number, f: (i: number) => ComponentChildren) => Array.from({ length: n }, (_, i) => f(i));
/** Stable pseudo-random spread, so a clip looks the same every time it plays. */
const at = (i: number, a: number, b: number, m: number) => (i * a + b) % m;

type Act = (p: string[], label: string) => ComponentChildren;

const ACTS: Record<string, Act> = {
  /** Something gets built: it rises out of the ground between two hammers. */
  build: (p) => <>
    <span class="cl-ground" />
    <P e={p[0]!} cls="cl-big cl-rise" />
    <P e="🔨" cls="cl-hammer l" /><P e="🔨" cls="cl-hammer r" />
    {many(5, (i) => <P key={i} e="💨" cls="cl-dust" style={{ '--x': `${20 + i * 15}%`, '--d': `${i * 0.12}s` }} />)}
    {p[1] && <P e={p[1]} cls="cl-side cl-popin" style={{ '--d': '1.2s' }} />}
    {many(6, (i) => <P key={`s${i}`} e="✨" cls="cl-spark" style={{ '--a': `${i * 60}deg`, '--d': '1.3s' }} />)}
  </>,
  /** Camera pushes in on the thing itself, under a spotlight. */
  zoom: (p) => <>
    <span class="cl-room"><span class="cl-desk" /><span class="cl-window" /></span>
    <span class="cl-zoomer"><span class="cl-spot" /><P e={p[0]!} cls="cl-big" />{p[1] && <P e={p[1]} cls="cl-side cl-bob" />}{p[2] && <P e={p[2]} cls="cl-side2 cl-bob" />}</span>
  </>,
  /** A celebration: the prop bounces while confetti falls. */
  party: (p) => <>
    <P e={p[0]!} cls="cl-big cl-bounce" />
    {p[1] && <P e={p[1]} cls="cl-side cl-bounce" style={{ '--d': '.15s' }} />}
    {many(22, (i) => <i key={i} class="cl-confetti" style={v({ '--x': `${at(i, 37, 5, 100)}%`, '--d': `${at(i, 13, 0, 9) / 10}s`, '--c': ['#E8C55A', '#D9653B', '#3F8F5A', '#3B6FB6', '#fff'][i % 5]! })} />)}
    <P e="🎉" cls="cl-corner l cl-popin" /><P e="🎉" cls="cl-corner r cl-popin" />
  </>,
  /** Refused: the thing shrinks and greys while a NO stamp lands on it. */
  deny: (p) => <>
    <P e={p[0]!} cls="cl-big cl-wither" />
    <span class="cl-no">NO</span>
    <P e="💢" cls="cl-anger" /><P e="🌧️" cls="cl-gloom" />
  </>,
  /** Money comes in: the thing leaves, coins pour into the chest. */
  cashin: (p) => <>
    <P e={p[0]!} cls="cl-big cl-exitr" />
    <P e="💰" cls="cl-big cl-chest" />
    {many(12, (i) => <P key={i} e="🪙" cls="cl-coinin" style={{ '--x': `${-60 + at(i, 31, 0, 120)}px`, '--d': `${0.5 + i * 0.08}s` }} />)}
  </>,
  /** Money goes out: coins arc from the bag to the thing being paid for. */
  cashout: (p) => <>
    <P e="💰" cls="cl-left cl-shrinkbag" />
    <P e={p[0]!} cls="cl-right cl-popin" style={{ '--d': '.9s' }} />
    {many(8, (i) => <P key={i} e="🪙" cls="cl-coinarc" style={{ '--d': `${0.15 + i * 0.1}s` }} />)}
    {p[1] && <P e={p[1]} cls="cl-side cl-popin" style={{ '--d': '1.3s' }} />}
  </>,
  /** A chase across the screen. */
  chase: (p) => <>
    <span class="cl-ground" />
    <span class="cl-runner"><P e={p[0]!} cls="cl-mid cl-hop" /></span>
    <span class="cl-runner late"><P e={p[1] ?? '🚓'} cls="cl-mid cl-hop" /></span>
    {many(4, (i) => <P key={i} e="💨" cls="cl-dust" style={{ '--x': `${10 + i * 22}%`, '--d': `${0.3 + i * 0.3}s` }} />)}
  </>,
  /** It rains the thing. */
  rain: (p) => <>
    {many(16, (i) => <P key={i} e={p[i % Math.min(p.length, 2)]!} cls="cl-fall" style={{ '--x': `${at(i, 29, 3, 96)}%`, '--d': `${at(i, 7, 0, 12) / 10}s`, '--r': `${at(i, 50, 0, 60) - 30}deg` }} />)}
    <P e={p[2] ?? '☂️'} cls="cl-big cl-bob" />
  </>,
  /** There are suddenly a lot of them. */
  swarm: (p) => <>
    {many(22, (i) => <P key={i} e={p[i % Math.min(p.length, 2)]!} cls="cl-swarm" style={{ '--x': `${at(i, 41, 4, 88)}%`, '--y': `${at(i, 23, 10, 70)}%`, '--d': `${i * 0.07}s`, '--s': `${0.7 + at(i, 3, 0, 5) / 10}` }} />)}
  </>,
  /** It takes off. */
  launch: (p) => <>
    <span class="cl-ground" />
    <span class="cl-rocket"><P e={p[0]!} cls="cl-big" /><P e="🔥" cls="cl-flame" /></span>
    {many(5, (i) => <P key={i} e="💨" cls="cl-dust" style={{ '--x': `${30 + i * 10}%`, '--d': `${0.5 + i * 0.05}s` }} />)}
    {p[1] && <P e={p[1]} cls="cl-side cl-lookup" />}
  </>,
  /** Front page of the Bugle. */
  news: (p, label) => <span class="cl-paper"><b>THE BUGLE</b><em>{label.toUpperCase()}</em><span class="cl-photo"><P e={p[0]!} cls="cl-mid" />{p[1] && <P e={p[1]} cls="cl-mid" />}</span><i /><i /><i /></span>,
  /** One thing becomes another in a puff of smoke. */
  morph: (p) => <>
    <P e={p[0]!} cls="cl-big cl-morphout" /><P e="💨" cls="cl-big cl-poof" /><P e={p[1] ?? '✨'} cls="cl-big cl-morphin" />
    {many(6, (i) => <P key={i} e="✨" cls="cl-spark" style={{ '--a': `${i * 60}deg`, '--d': '1s' }} />)}
  </>,
  /** Someone makes off with it. */
  steal: (p) => <>
    <P e={p[0]!} cls="cl-big cl-stolen" />
    <P e={p[1] ?? '🦝'} cls="cl-big cl-thief" />
    <P e="❓" cls="cl-corner r cl-popin" style={{ '--d': '1.6s' }} />
  </>,
  /** On the podium, and they love it. */
  cheer: (p) => <>
    <span class="cl-podium" /><P e={p[0]!} cls="cl-big cl-onpodium cl-bounce" />
    <span class="cl-crowd">{many(9, (i) => <P key={i} e={['🙌', '👏', '😀'][i % 3]!} cls="cl-head" style={{ '--d': `${i * 0.07}s` }} />)}</span>
  </>,
  /** On the podium, and they do not. */
  boo: (p) => <>
    <span class="cl-podium" /><P e={p[0]!} cls="cl-big cl-onpodium cl-flinch" />
    {many(6, (i) => <P key={i} e="🍅" cls="cl-tomato" style={{ '--d': `${0.3 + i * 0.22}s`, '--y': `${at(i, 17, 0, 30) - 15}px` }} />)}
    <span class="cl-crowd">{many(9, (i) => <P key={i} e={['😠', '👎', '😤'][i % 3]!} cls="cl-head" style={{ '--d': `${i * 0.07}s` }} />)}</span>
  </>,
  /** A tattoo, applied one piece at a time. */
  ink: (p) => <>
    <span class="cl-arm"><span class="cl-tattoo">{p.map((e, i) => <P key={i} e={e} cls="cl-inked" style={{ '--d': `${0.5 + i * 0.5}s`, '--s': `${1 - i * 0.22}` }} />)}</span></span>
    <P e="✒️" cls="cl-needle" /><P e="⚡" cls="cl-buzz" />
  </>,
  /** A race, with speed lines. First prop wins. */
  race: (p) => <>
    <span class="cl-ground" /><span class="cl-speed" />
    <span class="cl-racer fast"><P e={p[0]!} cls="cl-mid" /></span>
    <span class="cl-racer slow"><P e={p[1] ?? '🚓'} cls="cl-mid" /></span>
    <P e="🏁" cls="cl-corner r cl-popin" style={{ '--d': '1.2s' }} />
  </>,
  /** Something gets eaten. */
  eat: (p) => <>
    <P e={p[1] ?? '🦝'} cls="cl-left cl-chomp" />
    <P e={p[0]!} cls="cl-right cl-eaten" />
    {many(6, (i) => <i key={i} class="cl-crumb" style={v({ '--d': `${0.5 + i * 0.18}s`, '--y': `${at(i, 13, 0, 40) - 20}px` })} />)}
  </>,
  /** Order in the court. */
  court: (p) => <>
    <span class="cl-bench" /><P e={p[0]!} cls="cl-big cl-judge" /><P e="🔨" cls="cl-gavel" />
    {p[1] && <P e={p[1]} cls="cl-side cl-flinch" />}
    <P e="💥" cls="cl-bang" />
  </>,
  /** Two things take to each other. */
  love: (p) => <>
    <P e={p[0]!} cls="cl-left cl-leanr" /><P e={p[1] ?? '❤️'} cls="cl-right cl-leanl" />
    {many(7, (i) => <P key={i} e="❤️" cls="cl-heart" style={{ '--x': `${35 + at(i, 11, 0, 30)}%`, '--d': `${0.4 + i * 0.18}s` }} />)}
  </>,
  /** It gets fixed. */
  fix: (p) => <>
    <P e={p[0]!} cls="cl-big cl-wobble" /><P e="🔧" cls="cl-tool" /><P e="✅" cls="cl-corner r cl-popin" style={{ '--d': '1.4s' }} />
    {many(6, (i) => <P key={i} e="✨" cls="cl-spark" style={{ '--a': `${i * 60}deg`, '--d': '1.4s' }} />)}
  </>,
  /** The water rises. */
  flood: (p) => <>
    <span class="cl-room"><span class="cl-desk" /><span class="cl-window" /></span>
    <span class="cl-water"><P e={p[0]!} cls="cl-mid cl-float" />{p[1] && <P e={p[1]} cls="cl-mid cl-float" style={{ '--d': '.4s' }} />}</span>
  </>,
  /** It goes wrong, loudly. */
  boom: (p) => <>
    <P e={p[0]!} cls="cl-big cl-blown" /><P e="💥" cls="cl-big cl-blast" />
    {many(8, (i) => <P key={i} e={p[1] ?? '💨'} cls="cl-debris" style={{ '--a': `${i * 45}deg`, '--d': '.55s' }} />)}
  </>,
  /** Nothing much happens, on purpose. */
  sulk: (p) => <>
    <P e={p[0]!} cls="cl-big cl-droop" /><P e="🌧️" cls="cl-gloom" /><P e="💤" cls="cl-zzz" />
  </>,
  /** It arrives with a flourish: the default. */
  show: (p) => <>
    <P e={p[0]!} cls="cl-big cl-popin cl-bob" />
    {p[1] && <P e={p[1]} cls="cl-side cl-popin" style={{ '--d': '.5s' }} />}
    {p[2] && <P e={p[2]} cls="cl-side2 cl-popin" style={{ '--d': '.8s' }} />}
    {many(6, (i) => <P key={i} e="✨" cls="cl-spark" style={{ '--a': `${i * 60}deg`, '--d': '.4s' }} />)}
  </>,
};

export const ACT_NAMES = Object.keys(ACTS);
const BACKDROP: Record<string, string> = { build: 'out', chase: 'out', race: 'out', launch: 'out', rain: 'sky', swarm: 'out', zoom: 'room', flood: 'room', court: 'room', ink: 'room', news: 'press', cheer: 'out', boo: 'out', party: 'out', deny: 'grey', sulk: 'grey' };

export function ClipStage({ clip, label, children }: { clip: Clip; label: string; children?: ComponentChildren }) {
  const act = ACTS[clip.act] ?? ACTS.show!;
  const props = clip.props.length ? clip.props : ['❓'];
  return (
    <div class={`clip act-${clip.act} bg-${BACKDROP[clip.act] ?? 'plain'}`} aria-hidden="true">
      {act(props, label)}
      {children}
    </div>
  );
}
