/** Scene 3: "Welcome to MM Builders" over a blurred video. Click (or Enter / Space) to continue. */
export default function WelcomeScene({ off, zoomIn, onContinue, videoRef }) {
  return (
    <div
      className={`sc${off ? ' off' : ''}${zoomIn ? ' zin' : ''}`}
      id="s4"
      role="button"
      tabIndex={0}
      aria-label="Welcome. Click to continue to the website"
      onClick={onContinue}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onContinue();
        }
      }}
    >
      <video id="vid" ref={videoRef} muted playsInline loop preload="auto" aria-hidden="true" src="/videos/intro-welcome.mp4" />
      <div className="vs" />
      <small className="s4i">WELCOME TO</small>
      <h2 className="s4i">MM BUILDERS &amp; INFRASTRUCTURE</h2>
      <span className="dv s4i" />
      <p className="s4i">Building Your Vision. Creating Your Future.</p>
      <span id="hint">CLICK TO CONTINUE →</span>
    </div>
  );
}
