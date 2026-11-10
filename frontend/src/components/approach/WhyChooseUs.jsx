import Reveal from '../common/Reveal.jsx';
import { WHY_CHOOSE_US } from '../../data/approachContent.jsx';

export default function WhyChooseUs() {
  return (
    <div style={{ marginTop: 60 }}>
      <Reveal className="ey">Why Choose Us</Reveal>
      <Reveal as="h2" className="t">A Partner You Can Trust</Reveal>
      <div className="why">
        {WHY_CHOOSE_US.map((item, i) => (
          <Reveal key={item.title} delay={i ? `${i * 0.1}s` : undefined}>
            <svg viewBox="0 0 40 40">{item.icon}</svg>
            <span>
              <b>{item.title}</b>
              <p>{item.text}</p>
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
