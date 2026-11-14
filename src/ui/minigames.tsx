// Four short mini-games (about 5 seconds each). Each reports a Skill: 0 flop, 1 fine, 2 great.
// They are pure UI: the engine only ever sees the resulting Skill.
import { useEffect, useRef, useState } from 'preact/hooks';
import type { GameId, Skill } from '../engine/types.ts';
import { INK } from './art.tsx';
import { sfx } from './platform.ts';

const O = { stroke: INK, 'stroke-width': 2, 'stroke-linejoin': 'round' as const };

export function Sprite({ theme, size = 44 }: { theme: string; size?: number }) {
  const body = {
    goose: <><ellipse cx="20" cy="30" rx="13" ry="8" fill="#fff" {...O} /><path d="M28 28 q6 -14 2 -20" stroke={INK} stroke-width="8" fill="none" stroke-linecap="round" /><path d="M28 28 q6 -14 2 -20" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round" /><path d="M32 6 l9 2 l-9 4z" fill="#E8943A" {...O} /></>,
    raccoon: <><path d="M8 14 l-2 -9 l8 4z M36 14 l2 -9 l-8 4z" fill="#8C8577" {...O} /><ellipse cx="22" cy="24" rx="16" ry="13" fill="#B8B1A4" {...O} /><path d="M8 22 q7 -7 13 0 q-4 7 -10 5z M36 22 q-7 -7 -13 0 q4 7 10 5z" fill="#3A322C" /><circle cx="15" cy="23" r="2" fill="#fff" /><circle cx="29" cy="23" r="2" fill="#fff" /><ellipse cx="22" cy="30" rx="3" ry="2" fill={INK} /></>,
    frog: <><ellipse cx="22" cy="28" rx="15" ry="10" fill="#5FA77A" {...O} /><circle cx="14" cy="16" r="5.5" fill="#fff" {...O} /><circle cx="30" cy="16" r="5.5" fill="#fff" {...O} /><circle cx="14" cy="16" r="2" fill={INK} /><circle cx="30" cy="16" r="2" fill={INK} /><path d="M14 30 q8 5 16 0" fill="none" {...O} /></>,
    cheese: <><path d="M4 32 l30 -20 l6 20z" fill="#F7D774" {...O} /><circle cx="18" cy="27" r="3" fill="#E8C55A" {...O} /><circle cx="29" cy="24" r="2" fill="#E8C55A" {...O} /><circle cx="25" cy="18" r="1.3" fill={INK} /><circle cx="31" cy="18" r="1.3" fill={INK} /></>,
    coin: <><circle cx="22" cy="22" r="16" fill="#E8C55A" {...O} /><circle cx="22" cy="22" r="11" fill="none" stroke={INK} stroke-width="1.5" /><path d="M22 14 v16 M18 18 q4 -3 8 0 q0 4 -4 4 q-4 0 -4 4 q4 3 8 0" fill="none" stroke={INK} stroke-width="2" stroke-linecap="round" /></>,
    paper: <><path d="M9 5 h20 l7 7 v27 h-27z" fill="#fff" {...O} /><path d="M29 5 v7 h7" fill="none" {...O} /><path d="M14 18 h16 M14 24 h16 M14 30 h10" stroke={INK} stroke-width="2" stroke-linecap="round" /></>,
    star: <path d="M22 4 l5.3 11.2 l12.2 1.5 l-9 8.4 l2.3 12.1 l-10.8 -6 l-10.8 6 l2.3 -12.1 l-9 -8.4 l12.2 -1.500z" fill="#F7D774" {...O} />,
  } as Record<string, preact.ComponentChildren>;
  return <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">{body[theme] ?? body.star}</svg>;
}

type Done = (skill: Skill) => void;

/** Stop the marker in the green. The gold centre is a great result. */
function Timing({ done }: { done: Done }) {
  const [pos, setPos] = useState(0);
  const zone = useRef(18 + Math.random() * 50);
  const stopped = useRef(false);
  const posRef = useRef(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      if (stopped.current) return;
      const p = 50 - 50 * Math.cos(((t - t0) / 1000) * 3.4);
      posRef.current = p; setPos(p);
      if (t - t0 > 9000) { stopped.current = true; done(0); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const stop = () => {
    if (stopped.current) return;
    stopped.current = true;
    const d = Math.abs(posRef.current - (zone.current + 11));
    done(d <= 4 ? 2 : d <= 11 ? 1 : 0);
  };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); stop(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  return (
    <>
      <div class="mg-bar" aria-hidden="true"><i class="mg-zone" style={{ left: `${zone.current}%`, width: '22%' }} /><i class="mg-gold" style={{ left: `${zone.current + 7}%`, width: '8%' }} /><i class="mg-marker" style={{ left: `${pos}%` }} /></div>
      <button class="btn primary mg-big" onPointerDown={stop}>NOW!</button>
      <p class="hint">Stop the marker in the green. Gold is perfect. (Space works too.)</p>
    </>
  );
}

/** Tap things before they vanish. */
function Whack({ done, theme }: { done: Done; theme: string }) {
  const [items, setItems] = useState<{ id: number; x: number; y: number }[]>([]);
  const [hits, setHits] = useState(0);
  const [left, setLeft] = useState(6);
  const hitRef = useRef(0);
  useEffect(() => {
    let id = 0;
    const spawn = setInterval(() => {
      const item = { id: id++, x: 6 + Math.random() * 74, y: 6 + Math.random() * 66 };
      setItems((list) => [...list, item]);
      setTimeout(() => setItems((list) => list.filter((i) => i.id !== item.id)), 950);
    }, 430);
    const clock = setInterval(() => setLeft((v) => v - 1), 1000);
    const end = setTimeout(() => done(hitRef.current >= 8 ? 2 : hitRef.current >= 5 ? 1 : 0), 6000);
    return () => { clearInterval(spawn); clearInterval(clock); clearTimeout(end); };
  }, []);
  return (
    <>
      <div class="mg-arena">
        {items.map((i) => <button key={i.id} class="mg-target" style={{ left: `${i.x}%`, top: `${i.y}%` }} aria-label="Catch" onPointerDown={() => { hitRef.current += 1; setHits(hitRef.current); setItems((list) => list.filter((x) => x.id !== i.id)); sfx('tap'); }}><Sprite theme={theme} /></button>)}
      </div>
      <p class="mg-score"><b>{hits}</b> caught · {Math.max(0, left)}s left · 5 is fine, 8 is great</p>
    </>
  );
}

/** Tap as fast as you can; the bar drains. */
function Mash({ done }: { done: Done }) {
  const [level, setLevel] = useState(0);
  const [left, setLeft] = useState(5);
  const ref = useRef(0);
  const over = useRef(false);
  const finish = (s: Skill) => { if (!over.current) { over.current = true; done(s); } };
  useEffect(() => {
    const drain = setInterval(() => { ref.current = Math.max(0, ref.current - 1.7); setLevel(ref.current); }, 100);
    const clock = setInterval(() => setLeft((v) => v - 1), 1000);
    const end = setTimeout(() => finish(ref.current >= 55 ? 1 : 0), 5000);
    return () => { clearInterval(drain); clearInterval(clock); clearTimeout(end); };
  }, []);
  const tap = () => { ref.current = Math.min(100, ref.current + 7.5); setLevel(ref.current); sfx('tap'); if (ref.current >= 100) finish(2); };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === ' ' && !e.repeat) { e.preventDefault(); tap(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  return (
    <>
      <div class="mg-bar tall" aria-hidden="true"><i class="mg-fill" style={{ width: `${level}%` }} /><i class="mg-line" style={{ left: '55%' }} /></div>
      <button class="btn primary mg-big" onPointerDown={tap}>TAP! TAP! TAP!</button>
      <p class="mg-score">{Math.max(0, left)}s left · past the line is fine, full is great</p>
    </>
  );
}

/** Watch four signals, then repeat them. */
function Sequence({ done }: { done: Done }) {
  const DIRS = ['▲', '▶', '▼', '◀'];
  const seq = useRef(Array.from({ length: 4 }, () => Math.floor(Math.random() * 4)));
  const [show, setShow] = useState(-1); // index being shown, 4 = your turn
  const [got, setGot] = useState<number[]>([]);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setShow(i); if (i < 4) sfx('tap'); i += 1; if (i > 4) clearInterval(t); }, 620);
    return () => clearInterval(t);
  }, []);
  const press = (d: number) => {
    if (show < 4) return;
    const next = [...got, d];
    setGot(next);
    sfx('tap');
    const wrongAt = next.findIndex((v, i) => v !== seq.current[i]);
    if (wrongAt >= 0) done(wrongAt >= 3 ? 1 : 0);
    else if (next.length === 4) done(2);
  };
  useEffect(() => { const k = (e: KeyboardEvent) => { const i = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].indexOf(e.key); if (i >= 0) { e.preventDefault(); press(i); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); });
  return (
    <>
      <div class="mg-signal" aria-live="polite">{show < 0 ? 'Watch…' : show < 4 ? <b key={show}>{DIRS[seq.current[show]!]}</b> : <span>Your turn: {got.map((g) => DIRS[g]).join(' ') || '?'}</span>}</div>
      <div class="mg-pad">{DIRS.map((d, i) => <button key={d} class={`btn mg-dir d${i}`} disabled={show < 4} onPointerDown={() => press(i)} aria-label={['Up', 'Right', 'Down', 'Left'][i]}>{d}</button>)}</div>
      <p class="hint">Watch four signals, then repeat them in order. All four is great, three is fine.</p>
    </>
  );
}

export function MiniGame({ game, theme, title, onDone }: { game: GameId; theme: string; title: string; onDone: (skill: Skill) => void }) {
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<Skill | null>(null);
  const finish = (s: Skill) => {
    if (result !== null) return;
    setResult(s);
    sfx(s === 2 ? 'win' : s === 0 ? 'lose' : 'coin');
    setTimeout(() => onDone(s), 900);
  };
  return (
    <div class="mg">
      <div class="mg-head"><Sprite theme={theme} size={40} /><h2 class="display">{title}</h2></div>
      {result !== null ? <div class={`mg-result s${result}`}>{['Oh no.', 'Good enough!', 'Magnificent!'][result]}</div>
        : !started ? (
          <>
            <p class="hint">A quick challenge decides how well this goes. It takes about five seconds.</p>
            <button class="btn primary" autoFocus onClick={() => { setStarted(true); sfx('tap'); }}>Ready</button>
            <button class="btn ghost skip" onClick={() => finish(1)}>Skip the game <small>counts as "good enough"</small></button>
          </>
        ) : game === 'timing' ? <Timing done={finish} /> : game === 'whack' ? <Whack done={finish} theme={theme} /> : game === 'mash' ? <Mash done={finish} /> : <Sequence done={finish} />}
    </div>
  );
}
