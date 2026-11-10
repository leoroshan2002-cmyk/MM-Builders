import { useEffect, useRef } from 'react';

/** Runs `handler` on every scroll (and once on mount). Always uses the latest handler. */
export default function useWindowScroll(handler) {
  const saved = useRef(handler);
  saved.current = handler;

  useEffect(() => {
    const run = () => saved.current();
    window.addEventListener('scroll', run, { passive: true });
    window.addEventListener('resize', run);
    run();
    return () => {
      window.removeEventListener('scroll', run);
      window.removeEventListener('resize', run);
    };
  }, []);
}
