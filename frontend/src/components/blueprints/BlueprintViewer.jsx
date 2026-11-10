import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion.js';

const STEPS = ['Reading blueprint…', 'Tracing walls & lines…', 'Extruding to 3D…', 'Placing labels & layers…', 'Ready'];
const EASE = 'cubic-bezier(.2,.7,.2,1)';

/**
 * Full-screen viewer that shows the interactive 3D page of a blueprint inside an iframe.
 * While the page loads, a fake "reading blueprint → extruding to 3D" progress screen is shown
 * (at least 2.6 s, so the animation never flashes by).
 *
 * Props: blueprints, index (which one is open), originRect (card position for the open animation),
 *        onChange(newIndex), onClose()
 */
export default function BlueprintViewer({ blueprints, index, originRect, onChange, onClose }) {
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const closeBtn = useRef(null);
  const timers = useRef([]);
  const loaded = useRef(false);
  const minDone = useRef(false);
  const [ready, setReady] = useState(false);
  const [stepText, setStepText] = useState(STEPS[0]);
  const [bar, setBar] = useState('6%');

  const bp = blueprints[index];

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const reveal = () => {
    if (loaded.current && minDone.current) {
      setStepText(STEPS[4]);
      setBar('100%');
      timers.current.push(setTimeout(() => setReady(true), 350));
    }
  };

  // Open animation: grows out of the clicked card
  useEffect(() => {
    const root = rootRef.current;
    document.body.style.overflow = 'hidden';
    if (!reduced && originRect) {
      const W = window.innerWidth;
      const H = window.innerHeight;
      root.animate(
        [
          { clipPath: `inset(${originRect.top}px ${W - originRect.right}px ${H - originRect.bottom}px ${originRect.left}px round 16px)`, opacity: 0.6 },
          { clipPath: 'inset(0px 0px 0px 0px round 0px)', opacity: 1 },
        ],
        { duration: 750, easing: EASE }
      );
    } else {
      root.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
    }
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = '';
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // (Re)start the progress animation whenever another blueprint is shown
  useEffect(() => {
    clearTimers();
    loaded.current = false;
    minDone.current = false;
    setReady(false);
    setBar('6%');
    setStepText(STEPS[0]);
    const gap = reduced ? 0 : 650;
    [1, 2, 3].forEach((k) =>
      timers.current.push(
        setTimeout(() => {
          setStepText(STEPS[k]);
          setBar(`${k * 24 + 10}%`);
        }, k * gap + 300)
      )
    );
    timers.current.push(
      setTimeout(() => {
        minDone.current = true;
        reveal();
      }, reduced ? 100 : 2600)
    );
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const close = () => {
    clearTimers();
    if (reduced) return onClose();
    rootRef.current
      .animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.97)' }], { duration: 350, easing: 'ease' })
      .addEventListener('finish', onClose);
    return undefined;
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const count = blueprints.length;

  return (
    <div id="bpv" ref={rootRef} className={ready ? 'rdy' : ''} role="dialog" aria-modal="true" aria-label="3D blueprint viewer">
      <div className="bpv-grid" />
      <div className="bpv-bar">
        <div className="bpv-t">
          <small>Blueprint → 3D</small>
          <b>{`${bp.title} – ${bp.subtitle}`}</b>
        </div>
        <div className="bpv-a">
          <button type="button" id="bpvp" aria-label="Previous blueprint" onClick={() => onChange((index + count - 1) % count)}>‹</button>
          <button type="button" id="bpvx2" aria-label="Next blueprint" onClick={() => onChange((index + 1) % count)}>›</button>
          <a id="bpvo" href={bp.file} target="_blank" rel="noopener">Open full screen ↗</a>
          <button type="button" id="bpvc" ref={closeBtn} aria-label="Close 3D viewer" onClick={close}>✕ Close</button>
        </div>
      </div>

      <div className="bpv-stage">
        <iframe
          id="bpvf"
          key={bp.file}
          title="3D blueprint model"
          allow="fullscreen"
          src={bp.file}
          onLoad={() => {
            loaded.current = true;
            reveal();
          }}
        />
        <div className="bpv-load" id="bpvl">
          <div className="bpv-pl">
            <img src={bp.thumbnail} alt={`${bp.title} blueprint`} />
            <i className="bpv-scan" />
          </div>
          <div className="bpv-st">{stepText}</div>
          <div className="bpv-bar2">
            <i style={{ width: bar }} />
          </div>
        </div>
      </div>
    </div>
  );
}
