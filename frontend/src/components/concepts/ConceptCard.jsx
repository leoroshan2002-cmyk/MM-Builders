import { useEffect, useRef, useState } from 'react';
import useInView from '../../hooks/useInView.js';
import { prefersReducedMotion } from '../../hooks/useReducedMotion.js';

/**
 * Gallery tile: shows a picture; on desktop hover it plays a muted preview of the concept video.
 * Click opens the full viewer.
 */
export default function ConceptCard({ concept, index, hidden, viewerOpen, onOpen }) {
  const [ref, inView] = useInView();
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const buttonRef = useRef(null);
  const want = useRef(false);
  const [live, setLive] = useState(false);

  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  // Fetch the video source lazily (only when set once)
  const prepare = () => {
    const v = videoRef.current;
    if (v && !v.getAttribute('src')) {
      v.src = concept.video;
      v.muted = true;
      v.defaultMuted = true;
      v.load();
    }
  };

  // Warm up the video when the card is near the screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.preload = 'metadata';
          prepare();
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    if (prefersReducedMotion() || !canHover || viewerOpen) return;
    want.current = true;
    prepare();
    videoRef.current.play()?.catch(() => {});
  };

  const stop = () => {
    want.current = false;
    setLive(false);
    if (barRef.current) barRef.current.style.width = '0';
    setTimeout(() => {
      const v = videoRef.current;
      if (!want.current && v) {
        v.pause();
        v.currentTime = 0;
      }
    }, 650);
  };

  return (
    <div ref={ref} className={`pc rv${inView ? ' in' : ''}${hidden ? ' h' : ''}`} style={{ '--d': `${(index % 4) * 0.08}s` }}>
      <button
        ref={buttonRef}
        className={`pcv ${concept.fit}${live ? ' live' : ''}`}
        type="button"
        aria-label={`Watch ${concept.title} video`}
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={() => canHover && start()}
        onBlur={stop}
        onClick={() => {
          stop();
          onOpen(index, buttonRef.current);
        }}
      >
        <img className="pci" src={concept.image} alt={concept.title} loading="lazy" />
        <video
          ref={videoRef}
          className="pcm"
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration && barRef.current) barRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
          }}
          onPlaying={() => want.current && setLive(true)}
        />
        <span className="pcl">
          <i />
          Preview
        </span>
        <em>Concept Design</em>
        <i className="pcr" ref={barRef} />
      </button>
      <b>{concept.title}</b>
      <span>Hover to preview · Click to watch</span>
    </div>
  );
}
