import { forwardRef, useEffect, useRef } from 'react';
import { startParticles } from '../../effects/particleEngine.js';

/**
 * Scene 2: a desk with a monitor showing the logo and a "Click to enter" button.
 * The parent owns the camera-zoom logic; this component only draws the scene and the floating dust.
 *
 * refs:  dkRef -> the zooming desk container,  deskImgRef -> the desk photo,  sceneRef -> whole scene
 */
const DeskScene = forwardRef(function DeskScene({ off, entering, fading, onEnter, deskImgRef, dkRef }, sceneRef) {
  const dustRef = useRef(null);

  useEffect(
    () =>
      startParticles({
        host: sceneRef.current,
        canvas: dustRef.current,
        mode: 'fire',
        alwaysOn: true,
        absolutePointer: true,
        count: (w, h) => Math.round((w * h) / 16000) + 10,
      }),
    [sceneRef]
  );

  return (
    <div className={`sc${off ? ' off' : ''}`} id="s2" ref={sceneRef}>
      <div id="dbg" style={{ backgroundImage: 'url(/images/intro/desk.webp)' }} />
      <div id="dk" ref={dkRef} className={`${entering ? 'go' : ''}${fading ? ' fade' : ''}`.trim()}>
        <img id="desk" ref={deskImgRef} alt="Desk with a monitor showing the MM Builders logo and a Click to Enter button" src="/images/intro/desk.webp" />
        <span className="ring" />
        <img id="lg" src="/images/logo.webp" alt="MM Builders & Infrastructure logo" />
        <button id="enter" aria-label="Click to enter" onClick={onEnter}>
          CLICK TO ENTER <b>→</b>
        </button>
        {/* decorative layers: mouse shadow, lamp light, monitor sheen … */}
        <i className="ms-sh" />
        <i className="ms-spot" />
        <i className="lamp-gl" />
        <i className="scr-sw" />
        <i className="ms-gl" />
      </div>
      <canvas id="idust" ref={dustRef} />
    </div>
  );
});

export default DeskScene;
