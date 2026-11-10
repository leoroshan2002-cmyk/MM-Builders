import { useEffect, useRef } from 'react';
import ParticleLayer from '../common/ParticleLayer.jsx';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import useWindowScroll from '../../hooks/useWindowScroll.js';
import { createHeroShader } from '../../effects/heroShader.js';

/**
 * Top banner. `started` turns true when the intro ends – that is when the villa's lights switch on.
 * The stage's CSS classes (gl / fbgo / fbdone) are controlled by effects/heroShader.js.
 */
export default function Hero({ started }) {
  const reduced = useReducedMotion();
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const nightRef = useRef(null);
  const litRef = useRef(null);
  const mapRef = useRef(null);
  const shader = useRef(null);

  useEffect(() => {
    shader.current = createHeroShader({
      stage: stageRef.current,
      canvas: canvasRef.current,
      imgNight: nightRef.current,
      imgLit: litRef.current,
      imgMap: mapRef.current,
      reducedMotion: reduced,
    });
    return () => {
      shader.current?.destroy();
      shader.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    if (started) shader.current?.start();
  }, [started, reduced]);

  // Slow parallax: the photo drifts down and zooms slightly while you scroll
  useWindowScroll(() => {
    const y = window.scrollY;
    if (!reduced && y < window.innerHeight && stageRef.current) {
      stageRef.current.style.transform = `translateY(${y * 0.22}px) scale(${1 + y * 0.00008})`;
    }
  });

  return (
    <section className="hero" style={{ padding: '20vh 0 9vh' }}>
      <ParticleLayer mode="fire" blobs={false} className="nomask" />

      <div className="stage" id="heroS" ref={stageRef}>
        <img className="fb n" ref={nightRef} src="/images/hero-night.webp" alt="" aria-hidden="true" />
        <img className="fb l" ref={litRef} src="/images/hero-lit.webp" alt="Modern luxury villa lit up at dusk" />
        <canvas id="hc" ref={canvasRef} aria-hidden="true" />
        <img id="hmap" ref={mapRef} src="/images/hero-map.png" alt="" aria-hidden="true" hidden />
      </div>

      <div className="dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="w">
        <div className="ey">Modern Spaces • Lasting Value</div>
        <h1>
          <span>
            <i>Building Your Vision.</i>
          </span>
          <span>
            <i>Creating Your Future.</i>
          </span>
        </h1>
        <p>Thoughtfully designed spaces. Carefully planned construction. A commitment to turning your vision into reality.</p>

        <div className="cta">
          <a className="btn f" href="#contact">Start Your Project</a>
          <a className="btn l" href="#services">Explore Our Services</a>
        </div>
      </div>

      <a className="sd" href="#about">
        Scroll
        <br />
        Down
      </a>
    </section>
  );
}
