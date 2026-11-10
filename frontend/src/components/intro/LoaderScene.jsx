import { useEffect, useRef } from 'react';

const DURATION = 2600; // ms – how long the 0 → 100 % count takes
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Scene 1: the logo fills up with colour while a counter runs from 0 to 100. */
export default function LoaderScene({ off }) {
  const numRef = useRef(null);
  const barRef = useRef(null);
  const colorLogoRef = useRef(null);
  const logoBoxRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      const p = Math.round(ease(t) * 100);
      if (numRef.current) numRef.current.textContent = p;
      if (barRef.current) barRef.current.style.width = `${p}%`;
      if (colorLogoRef.current) colorLogoRef.current.style.clipPath = `inset(${100 - p}% 0 0 0)`;
      if (logoBoxRef.current) {
        logoBoxRef.current.style.setProperty('--y', `${100 - p}%`);
        logoBoxRef.current.style.setProperty('--o', p >= 100 ? 0 : 1);
      }
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`sc${off ? ' off' : ''}`} id="s1">
      <div className="ld">
        <div className="ld-logo" ref={logoBoxRef}>
          <img className="g" alt="" src="/images/logo.webp" />
          <img className="c" ref={colorLogoRef} alt="MM Builders & Infrastructure" src="/images/logo.webp" />
        </div>
        <div className="ld-num">
          <span id="ldn" ref={numRef}>0</span>
          <em>%</em>
        </div>
        <div className="ld-bar">
          <i id="ldb" ref={barRef} />
        </div>
        <p>Building Your Vision. Creating Your Future.</p>
        <small>LOADING</small>
      </div>
    </div>
  );
}
