import { useEffect, useState } from 'react';

// Pictures that open full-screen when clicked
const SPOTLIGHT_TARGETS = '.pr .slot,.band .slot,.git .slot,.a2-ph';

/** Full-screen image viewer ("spotlight"). Click anywhere or press Esc to close. */
export default function Spotlight() {
  const [view, setView] = useState({ on: false, src: '', alt: '' });

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest(SPOTLIGHT_TARGETS);
      if (!el || e.target.closest('button,a')) return;
      const img = el.querySelector('img');
      if (!img || !img.src) return;
      setView({ on: true, src: img.src, alt: img.alt || '' });
    };
    const onKey = (e) => e.key === 'Escape' && setView((v) => ({ ...v, on: false }));
    document.addEventListener('click', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div id="spot" className={view.on ? 'on' : ''} onClick={() => setView((v) => ({ ...v, on: false }))}>
      <b aria-hidden="true">&times;</b>
      <img alt={view.alt} src={view.src || undefined} />
    </div>
  );
}
