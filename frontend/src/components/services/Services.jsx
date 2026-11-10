import { useSite } from '../../context/SiteContext.jsx';
import { useUi } from '../../context/UiContext.js';
import Reveal from '../common/Reveal.jsx';
import ParticleLayer from '../common/ParticleLayer.jsx';
import ServiceCard from './ServiceCard.jsx';

export default function Services() {
  const { services } = useSite();
  const { openService } = useUi();

  return (
    <section id="services" className="sv">
      <ParticleLayer mode="none" extras={['r r1']} />
      <div className="w">
        <div className="sh">
          <div className="sh-t">
            <Reveal className="ey">Our Services</Reveal>
            <Reveal as="h2" delay=".1s">
              Complete Solutions
              <br />
              for Your <em>Dream Space</em>
            </Reveal>
            <Reveal as="p" delay=".2s">
              From concept to completion, we provide end-to-end consultation and design solutions tailored to your needs.
            </Reveal>
            <Reveal as="a" className="sh-c" delay=".3s" href="#svg">
              <i>→</i>
              <span>Explore Our Services</span>
            </Reveal>
          </div>
          <div className="sh-tag" aria-hidden="true">
            <b />
            <span>
              Thoughtful Spaces
              <br />
              Stronger Tomorrows
            </span>
          </div>
          <img className="sh-v" alt="Modern villa lit up at dusk" src="/images/services/header.jpg" />
        </div>

        <div className="g3" id="svg">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} onKnowMore={openService} />
          ))}
        </div>
      </div>
      <i className="hl" />
    </section>
  );
}
