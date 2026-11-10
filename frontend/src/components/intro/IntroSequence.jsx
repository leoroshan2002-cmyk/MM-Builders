import { useCallback, useEffect, useRef, useState } from 'react';
import LoaderScene from './LoaderScene.jsx';
import DeskScene from './DeskScene.jsx';
import WelcomeScene from './WelcomeScene.jsx';

// Size of the desk photo and the point on it (the monitor) the camera zooms into
const DESK_W = 1672;
const DESK_H = 941;
const ZOOM_X = 0.487;
const ZOOM_Y = 0.4;

/**
 * Full-screen opening: loader → desk ("click to enter") → welcome video → website.
 * Calls onFinish() as soon as the website should start (hero lights, header logo …).
 * The "Skip intro" button jumps straight to the end.
 */
export default function IntroSequence({ onFinish }) {
  const [ui, setUi] = useState({ s1Off: false, s2Off: true, s4Off: true, entering: false, fading: false, zoomIn: false, out: false });
  const [finished, setFinished] = useState(false); // true -> hide skip button
  const [removed, setRemoved] = useState(false); // true -> unmount the whole intro

  const uiRef = useRef(ui);
  uiRef.current = ui;
  const doneRef = useRef(false);
  const readyRef = useRef(false); // welcome scene can be clicked
  const zoomedRef = useRef(false);
  const timers = useRef([]);
  const deskSceneRef = useRef(null);
  const dkRef = useRef(null);
  const deskImgRef = useRef(null);
  const videoRef = useRef(null);

  const patch = (changes) => setUi((s) => ({ ...s, ...changes }));
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    timers.current.forEach(clearTimeout);
    setUi((s) => ({ ...s, out: true }));
    setFinished(true);
    onFinish();
    timers.current = [
      setTimeout(() => {
        videoRef.current?.pause();
        setRemoved(true);
      }, 1400),
    ];
  }, [onFinish]);

  // Size/position the desk photo so it covers the screen (portrait phones show the centre-right part)
  const layout = useCallback(() => {
    const dk = dkRef.current;
    if (!dk) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const portrait = vw < vh;
    const s = !portrait ? Math.max(vw / DESK_W, vh / DESK_H) : vw / (DESK_W * 0.8);
    const w = DESK_W * s;
    const h = DESK_H * s;
    Object.assign(dk.style, {
      width: `${w}px`,
      height: `${h}px`,
      left: `${portrait ? vw / 2 - 0.585 * w : (vw - w) / 2}px`,
      top: `${Math.max(0, (vh - h) / 2)}px`,
    });
  }, []);

  // Scene 1 → 2 after the loader has counted up and the desk photo is decoded
  useEffect(() => {
    layout();
    const onResize = () => !uiRef.current.entering && layout();
    window.addEventListener('resize', onResize);

    Promise.all([new Promise((r) => setTimeout(r, 2800)), deskImgRef.current?.decode().catch(() => {})]).then(() => {
      if (doneRef.current) return;
      patch({ s1Off: true, s2Off: false });
    });

    return () => window.removeEventListener('resize', onResize);
  }, [layout]);

  // Click on the monitor button: zoom the camera into the screen, then show the welcome scene
  const enter = useCallback(() => {
    if (uiRef.current.entering || doneRef.current) return;
    layout();
    const dk = dkRef.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const r = dk.getBoundingClientRect();
    const k = Math.max(vw / (r.width * 0.56), vh / (r.height * 0.515)) * 1.03;
    const sx = r.left + ZOOM_X * r.width;
    const sy = r.top + ZOOM_Y * r.height;
    dk.style.transform = `translate(${vw / 2 - sx}px,${vh / 2 - sy}px) scale(${k})`;
    patch({ entering: true });

    const v = videoRef.current;
    v.muted = true;
    v.currentTime = 0;
    v.play().catch(() => {});
    v.addEventListener('canplay', () => v.play().catch(() => {}), { once: true });

    later(() => {
      patch({ s4Off: false, fading: true });
      later(() => {
        readyRef.current = true;
      }, 1200);
    }, 1500);
    later(() => patch({ s2Off: true }), 3200);
  }, [layout]);

  // Click on the welcome scene → zoom through and open the website
  const continueToSite = useCallback(() => {
    if (!readyRef.current || zoomedRef.current) return;
    zoomedRef.current = true;
    patch({ zoomIn: true });
    later(finish, 800);
  }, [finish]);

  // Enter key on the desk scene works like clicking the button
  useEffect(() => {
    const onKey = (e) => {
      const s = uiRef.current;
      if (e.key === 'Enter' && !doneRef.current && !s.s2Off && !s.entering) enter();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enter]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  if (removed) return null;

  return (
    <div id="intro" className={ui.out ? 'out' : ''} role="dialog" aria-label="Intro">
      {!finished && (
        <button id="skip" onClick={finish}>
          Skip intro
        </button>
      )}
      <LoaderScene off={ui.s1Off} />
      <DeskScene off={ui.s2Off} entering={ui.entering} fading={ui.fading} onEnter={enter} deskImgRef={deskImgRef} dkRef={dkRef} ref={deskSceneRef} />
      <WelcomeScene off={ui.s4Off} zoomIn={ui.zoomIn} onContinue={continueToSite} videoRef={videoRef} />
    </div>
  );
}
