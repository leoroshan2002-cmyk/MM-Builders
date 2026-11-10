import useInView from '../../hooks/useInView.js';
import useTilt from '../../hooks/useTilt.js';

/** One founder: avatar placeholder, name, role. Tilts toward the mouse on desktop. */
export default function FounderCard({ name, role, variant, delay }) {
  const [ref, inView] = useInView();
  useTilt(ref, { rx: 7, ry: 9, lift: 6, addClass: 'rdy', eventType: 'pointermove' });

  return (
    <div ref={ref} className={`a2-card rv ${variant}${inView ? ' in' : ''}`} style={{ '--d': delay }}>
      <svg className="a2-leaf" aria-hidden="true">
        <use href="#a2leaf" />
      </svg>
      <div className="a2-av" role="img" aria-label={`${name} photo placeholder`}>
        <svg viewBox="0 0 142 142" aria-hidden="true">
          <rect width="142" height="142" fill="#d3d3d5" />
          <circle cx="71" cy="54" r="25" fill="#fff" />
          <path d="M20 142c3-34 24-52 51-52s48 18 51 52z" fill="#fff" />
        </svg>
      </div>
      <i className="a2-cl" />
      <b>{name}</b>
      <small>{role}</small>
      <i className="a2-ring" />
    </div>
  );
}
