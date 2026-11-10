import { useEffect, useRef } from 'react';
import { useSite } from '../../context/SiteContext.jsx';
import useInView from '../../hooks/useInView.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import { startDreamBand } from '../../effects/dreamBand.js';
import { whatsappLink, telLink } from '../../utils/contact.js';
import ImageSlot from '../common/ImageSlot.jsx';
import { CheckIcon, WhatsAppIcon, CallIcon } from '../common/Icons.jsx';

const POINTS = [
  'Initial consultation to understand your goals',
  'Planning & design concepts for your space',
  'Transparent scope & quotation',
  'Regular updates through to handover',
];

/** "Let's Build Your Dream Space" call-to-action box with the drafting + rising-skyline canvas. */
export default function DreamSpaceBand() {
  const { settings } = useSite();
  const reduced = useReducedMotion();
  const [ref, inView] = useInView();
  const canvasRef = useRef(null);

  useEffect(() => startDreamBand(ref.current, canvasRef.current, reduced), [ref, reduced]);

  return (
    <div ref={ref} className={`band rv${inView ? ' in' : ''}`}>
      <div>
        <h3>Let’s Build Your Dream Space</h3>
        <p>Share your requirements and our team will get in touch with you.</p>
        <ul className="bl">
          {POINTS.map((text, i) => (
            <li key={text} style={{ '--i': i }}>
              <i>
                <CheckIcon />
              </i>
              {text}
            </li>
          ))}
        </ul>
        <div className="r">
          <a className="btn wa ico" target="_blank" rel="noopener" href={whatsappLink(settings.primaryPhone, settings.whatsappMessage)}>
            <span className="ib ibw">
              <WhatsAppIcon />
            </span>
            Chat on WhatsApp
          </a>
          <a className="btn l ico" href={telLink(settings.primaryPhone)}>
            <span className="ib ibc">
              <CallIcon />
            </span>
            <span>Call Now</span>
          </a>
        </div>
      </div>
      <ImageSlot name="cta-bg" alt="Modern home at dusk" size="1400×700" src="/images/cta-bg.webp" dark />
      <i className="orb" />
      <canvas className="bf" ref={canvasRef} />
    </div>
  );
}
