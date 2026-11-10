import { useRef } from 'react';
import useWindowScroll from '../../hooks/useWindowScroll.js';
import Reveal from '../common/Reveal.jsx';
import ImageSlot from '../common/ImageSlot.jsx';
import ParticleLayer from '../common/ParticleLayer.jsx';
import WhyChooseUs from './WhyChooseUs.jsx';
import { PROCESS_STEPS } from '../../data/approachContent.jsx';

export default function Approach() {
  const stepsRef = useRef(null);
  const lineRef = useRef(null);

  // The gold line beside the steps grows as you scroll past them
  useWindowScroll(() => {
    if (!stepsRef.current || !lineRef.current) return;
    const r = stepsRef.current.getBoundingClientRect();
    lineRef.current.style.height = `${Math.max(0, Math.min(r.height - 44, window.innerHeight * 0.6 - r.top))}px`;
  });

  return (
    <section id="approach" style={{ paddingTop: 20 }}>
      <ParticleLayer mode="build" className="nomask" />
      <div className="w">
        <div className="pr">
          <div>
            <Reveal className="ey">Our Approach</Reveal>
            <Reveal as="h2" className="t">
              A Clear Process
              <br />
              From Idea to Reality
            </Reveal>
            <div className="stp" id="stp" ref={stepsRef}>
              <div className="fl2" id="sf" ref={lineRef} />
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={step.title} className="st">
                  <i>{String(i + 1).padStart(2, '0')}</i>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <ImageSlot name="approach-side" alt="Staircase and interior" size="900×1200" src="/images/approach-side.webp" dark reveal />
        </div>

        <WhyChooseUs />
      </div>
      <i className="hl" />
    </section>
  );
}
