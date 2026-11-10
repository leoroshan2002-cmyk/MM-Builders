import { useEffect } from 'react';
import { prefersReducedMotion } from './useReducedMotion.js';

/**
 * Gentle 3D tilt that follows the mouse (desktop only).
 *   useTilt(ref, { rx: 6, ry: 8, lift: 4 })
 * `eventType` is 'mousemove' for cards and 'pointermove' for the founder cards (as in the original).
 */
export default function useTilt(ref, { rx = 6, ry = 8, lift = 4, perspective = 800, addClass, eventType = 'mousemove', decimals = 2 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover:hover)').matches) return undefined;

    const move = (e) => {
      if (addClass) el.classList.add(addClass);
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(${perspective}px) rotateX(${(-y * rx).toFixed(decimals)}deg) rotateY(${(x * ry).toFixed(decimals)}deg) translateY(-${lift}px)`;
    };
    const leave = () => {
      el.style.transform = '';
    };

    el.addEventListener(eventType, move);
    el.addEventListener(eventType === 'pointermove' ? 'pointerleave' : 'mouseleave', leave);
    return () => {
      el.removeEventListener(eventType, move);
      el.removeEventListener(eventType === 'pointermove' ? 'pointerleave' : 'mouseleave', leave);
    };
  }, [ref, rx, ry, lift, perspective, addClass, eventType, decimals]);
}
