import { useRef } from 'react';
import useWindowScroll from '../../hooks/useWindowScroll.js';

/** Thin gold line at the very top that fills as you scroll down the page. */
export default function ScrollProgress() {
  const ref = useRef(null);
  useWindowScroll(() => {
    const h = document.documentElement;
    if (ref.current) ref.current.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100}%`;
  });
  return <div id="pgb" ref={ref} />;
}
