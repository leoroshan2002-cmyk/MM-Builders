import useInView from '../../hooks/useInView.js';
import useTilt from '../../hooks/useTilt.js';
import ServiceIcon from './ServiceIcon.jsx';

const IMAGE_CLASS = { arch: ' a', full: ' bl3', plain: '' };

/** One of the six service cards. "Know More" opens the details dialog. */
export default function ServiceCard({ service, index, onKnowMore }) {
  const [ref, inView] = useInView();
  useTilt(ref, { rx: 6, ry: 8, lift: 4 });

  return (
    <div ref={ref} className={`vc${inView ? ' in' : ''}`} style={{ '--d': `${(index % 3) * 0.12}s` }}>
      <div className="tx">
        <div className="n">{String(service.order).padStart(2, '0')}</div>
        <ServiceIcon iconKey={service.iconKey} />
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
        <button className="km" onClick={() => onKnowMore(service)}>
          Know More
        </button>
      </div>
      <div className={`im${IMAGE_CLASS[service.imageStyle] || ''}`} style={{ '--cut': service.cut }}>
        <img src={service.image} alt={service.title} loading="lazy" />
      </div>
      <i className="orb" />
    </div>
  );
}
