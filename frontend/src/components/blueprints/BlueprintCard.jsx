import useInView from '../../hooks/useInView.js';

/** A blueprint thumbnail card that tilts into 3D on hover. Click opens the 3D viewer. */
export default function BlueprintCard({ blueprint, index, onOpen }) {
  const [ref, inView] = useInView();

  return (
    <article ref={ref} className={`bpc${inView ? ' in' : ''}`} style={{ '--d': `${index * 0.1}s` }}>
      <button
        className="bpb"
        type="button"
        aria-label={`Open ${blueprint.title} – ${blueprint.subtitle} in 3D`}
        onClick={(e) => onOpen(index, e.currentTarget)}
      >
        <span className="bpt">
          <span className="bpp">
            <img src={blueprint.thumbnail} alt={blueprint.thumbnailAlt} loading="lazy" />
            <i className="bps" />
          </span>
          <span className="bp3">3D</span>
          <span className="bpc1" />
          <span className="bpc2" />
          <span className="bpc3" />
          <span className="bpc4" />
          <i className="scan" />
        </span>

        <span className="bpx">
          <span className="bpn">{String(index + 1).padStart(2, '0')}</span>
          <span className="bph">{blueprint.title}</span>
          <span className="bpsb">{blueprint.subtitle}</span>
          <span className="bpd">{blueprint.description}</span>
          <span className="bpg">
            {blueprint.tags.map((tag) => (
              <em key={tag}>{tag}</em>
            ))}
          </span>
          <span className="bpgo">
            View in 3D <b>→</b>
          </span>
        </span>
        <i className="orb" />
      </button>
    </article>
  );
}
