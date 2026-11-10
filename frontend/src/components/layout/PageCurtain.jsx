import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../hooks/useReducedMotion.js';

/**
 * Handles every in-page link (href="#about" …): a dark curtain with the logo
 * sweeps over the page, the page jumps to the section, then the curtain lifts.
 */
export default function PageCurtain() {
  const [phase, setPhase] = useState(''); // '' | 'in' | 'out'
  const busy = useRef(false);
  const timers = useRef([]);

  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (hash.length < 2 || document.body.classList.contains('lock')) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();

      if (prefersReducedMotion()) {
        target.scrollIntoView();
        return;
      }
      if (busy.current) return;
      busy.current = true;
      setPhase('in');
      timers.current.push(
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'instant' });
          try {
            window.history.replaceState(null, '', hash);
          } catch (_) { /* ignore */ }
          setPhase('out');
        }, 560),
        setTimeout(() => {
          setPhase('');
          busy.current = false;
        }, 1250)
      );
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div id="cur" className={phase}>
      <img alt="" src="/images/logo.webp" />
    </div>
  );
}
