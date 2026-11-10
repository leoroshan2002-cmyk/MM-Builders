import { useEffect, useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import { startParticles } from '../../effects/particleEngine.js';

/**
 * Animated background layer for a section. Put it as the FIRST child of the section.
 *   <ParticleLayer mode="net" extras={['r r1', 'r r2']} />
 *
 * mode    – which animation to draw (see effects/particleModes.js)
 * blobs   – the three slow colour blobs behind the canvas
 * extras  – extra decorative elements (rings, scanning beam …) given as class names
 */
export default function ParticleLayer({ mode, blobs = true, className = '', extras = [] }) {
  const reduced = useReducedMotion();
  const fxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    return startParticles({ host: fxRef.current.parentElement, canvas: canvasRef.current, mode });
  }, [mode, reduced]);

  // Reduced motion: only the static colour blobs remain (and none for hero/footer)
  if (reduced && !blobs) return null;

  return (
    <div ref={fxRef} className={`fx${className && !reduced ? ` ${className}` : ''}`} aria-hidden="true">
      {blobs && (
        <>
          <i className="b b1" />
          <i className="b b2" />
          <i className="b b3" />
        </>
      )}
      {!reduced && extras.map((cls) => <i key={cls} className={cls} />)}
      {!reduced && <canvas ref={canvasRef} />}
    </div>
  );
}
