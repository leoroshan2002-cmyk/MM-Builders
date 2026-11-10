/** Content of the "Know More" dialog for one service. */
export default function ServiceDetails({ service, onDiscuss }) {
  return (
    <div className="sdg">
      <img src={service.image} alt={service.title} />
      <div className="sdb">
        <div className="sn">{String(service.order).padStart(2, '0')}</div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <h4>What we offer</h4>
        <ul>
          {service.offerings.map((text, k) => (
            <li key={text} style={{ '--i': k }}>
              {text}
            </li>
          ))}
        </ul>
        <h4>Typical deliverables</h4>
        <div className="chips">
          {service.deliverables.map((text) => (
            <span key={text}>{text}</span>
          ))}
        </div>
        <button className="btn f" onClick={onDiscuss}>
          Discuss this service
        </button>
      </div>
    </div>
  );
}
