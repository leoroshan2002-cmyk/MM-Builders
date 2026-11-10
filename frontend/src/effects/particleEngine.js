import M from './particleModes.js';

const dpr = () => Math.min(window.devicePixelRatio || 1, 1.25);

/**
 * Starts one animated canvas layer and returns a function that stops it.
 *
 *   host    – element that defines the drawing area (and receives pointer events)
 *   canvas  – the <canvas> to draw on
 *   mode    – key from particleModes.js ('fire', 'net', 'ember', 'flow', 'bokeh', 'brick', 'build', 'wave', 'star', 'none')
 *   count   – optional (w, h) => number of particles (defaults to the mode's own rule)
 *   alwaysOn / absolutePointer – used by the full-screen intro layer
 */
export function startParticles({ host, canvas, mode, count, alwaysOn = false, absolutePointer = false }) {
  const m = M[mode];
  if (!m || !host || !canvas) return () => {};

  const g = canvas.getContext('2d');
  const D = dpr();
  const it = { w: 0, h: 0, S: null, on: alwaysOn, last: 0, P: { x: 0, y: 0, on: false } };
  let raf = 0;
  let stopped = false;

  const size = () => {
    const r = host.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width));
    const h = Math.max(1, Math.round(r.height));
    if (w === it.w && h === it.h) return;
    it.w = w;
    it.h = h;
    canvas.width = Math.round(w * D);
    canvas.height = Math.round(h * D);
    g.setTransform(D, 0, 0, D, 0, 0);
    const n = count ? count(w, h) : m.n ? m.n(w * h) : 0;
    it.S = m.init.call(m, w, h, n);
  };

  const loop = (ts) => {
    raf = requestAnimationFrame(loop);
    if (document.hidden || !it.on || !it.S) return;
    const dt = Math.min(50, ts - (it.last || ts));
    it.last = ts;
    g.clearRect(0, 0, it.w, it.h);
    g.globalAlpha = 1;
    m.draw.call(m, g, it.w, it.h, ts, dt, it.P, it.S);
    g.globalAlpha = 1;
  };
  const run = () => {
    if (!raf && !stopped) raf = requestAnimationFrame(loop);
  };
  const pause = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  size();

  let resizeObserver;
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(size);
    resizeObserver.observe(host);
  } else {
    window.addEventListener('resize', size);
  }

  const onMove = (e) => {
    if (absolutePointer) {
      it.P.x = e.clientX;
      it.P.y = e.clientY;
    } else {
      const r = host.getBoundingClientRect();
      it.P.x = e.clientX - r.left;
      it.P.y = e.clientY - r.top;
    }
    it.P.on = true;
  };
  const onLeave = () => {
    it.P.on = false;
  };
  host.addEventListener('pointermove', onMove, { passive: true });
  host.addEventListener('pointerleave', onLeave);

  let visibility;
  if (alwaysOn) {
    run();
  } else {
    visibility = new IntersectionObserver(
      ([entry]) => {
        it.on = entry.isIntersecting;
        if (it.on) run();
        else pause();
      },
      { rootMargin: '120px' }
    );
    visibility.observe(host);
  }

  return () => {
    stopped = true;
    pause();
    resizeObserver?.disconnect();
    visibility?.disconnect();
    window.removeEventListener('resize', size);
    host.removeEventListener('pointermove', onMove);
    host.removeEventListener('pointerleave', onLeave);
  };
}
