import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion.js';

const PLAY = 'M8 5.5v13l11-6.5z';
const PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z';
const fmt = (t) => {
  const s = Math.floor(t || 0);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/**
 * Pop-up video player for a concept (always muted).
 * Props: concepts, list (indices that are currently visible, for prev/next), index, originRect, onChange, onClose
 * Keys: Esc closes, ← → switch concept, Space play/pause.
 */
export default function ConceptViewer({ concepts, list, index, originRect, onChange, onClose }) {
  const reduced = useReducedMotion();
  const boxRef = useRef(null);
  const videoRef = useRef(null);
  const trackRef = useRef(null);
  const closeBtn = useRef(null);
  const dragging = useRef(false);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState('0:00 / 0:00');

  const concept = concepts[index];

  const step = (d) => {
    if (list.length < 2) return;
    onChange(list[(list.indexOf(index) + d + list.length) % list.length]);
  };
  const toggle = () => {
    const v = videoRef.current;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };
  const seek = (e) => {
    const v = videoRef.current;
    const r = trackRef.current.getBoundingClientRect();
    if (v.duration) v.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * v.duration;
  };

  // Open animation: grows out of the clicked tile
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const box = boxRef.current;
    if (!reduced && originRect) {
      const f = box.getBoundingClientRect();
      box.animate(
        [
          {
            transform: `translate(${originRect.left + originRect.width / 2 - (f.left + f.width / 2)}px,${originRect.top + originRect.height / 2 - (f.top + f.height / 2)}px) scale(${Math.max(0.2, originRect.width / f.width)})`,
            opacity: 0.2,
            borderRadius: '12px',
          },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' }
      );
    }
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = '';
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.removeAttribute('src');
        v.load();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start playing whenever a different concept is selected
  useEffect(() => {
    const v = videoRef.current;
    v.muted = true;
    setProgress(0);
    setTime('0:00 / 0:00');
    v.play()?.catch(() => setPlaying(false));
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === ' ' && document.activeElement.tagName !== 'BUTTON') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div id="cv" role="dialog" aria-modal="true" aria-label="Concept video" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cv-box" ref={boxRef}>
        <div className="cv-h">
          <div>
            <small>Concept Design</small>
            <b>{concept.title}</b>
          </div>
          <button className="cv-x" ref={closeBtn} type="button" onClick={onClose}>✕ Close</button>
        </div>

        <div className="cv-s">
          <video
            id="cvv"
            key={concept.slug}
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            poster={concept.image}
            src={concept.video}
            onClick={toggle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) {
                setProgress((v.currentTime / v.duration) * 100);
                setTime(`${fmt(v.currentTime)} / ${fmt(v.duration)}`);
              }
            }}
          />
          <button className="cv-n cv-p" type="button" aria-label="Previous concept" onClick={() => step(-1)}>‹</button>
          <button className="cv-n cv-nx" type="button" aria-label="Next concept" onClick={() => step(1)}>›</button>
        </div>

        <div className="cv-c">
          <button className="cv-pp" type="button" aria-label="Play or pause" onClick={toggle}>
            <svg viewBox="0 0 24 24">
              <path d={playing ? PAUSE : PLAY} />
            </svg>
          </button>
          <div
            className="cv-pg"
            ref={trackRef}
            role="slider"
            aria-label="Seek"
            aria-valuenow={Math.round(progress)}
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              seek(e);
            }}
            onPointerMove={(e) => dragging.current && seek(e)}
            onPointerUp={() => (dragging.current = false)}
          >
            <i style={{ width: `${progress}%` }} />
          </div>
          <div className="cv-t">{time}</div>
        </div>
      </div>
    </div>
  );
}
