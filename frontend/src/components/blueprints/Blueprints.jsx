import { useRef, useState } from 'react';
import { useSite } from '../../context/SiteContext.jsx';
import Reveal from '../common/Reveal.jsx';
import ParticleLayer from '../common/ParticleLayer.jsx';
import BlueprintDrawing from './BlueprintDrawing.jsx';
import BlueprintCard from './BlueprintCard.jsx';
import BlueprintViewer from './BlueprintViewer.jsx';

export default function Blueprints() {
  const { blueprints } = useSite();
  const [viewer, setViewer] = useState(null); // { index, rect }
  const opener = useRef(null);

  const open = (index, button) => {
    opener.current = button;
    setViewer({ index, rect: button.querySelector('.bpt').getBoundingClientRect() });
  };
  const close = () => {
    setViewer(null);
    opener.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <section id="blueprints" className="bpS">
        <ParticleLayer mode="flow" extras={['beam']} />
        <BlueprintDrawing />
        <div className="w">
          <div className="bph0">
            <Reveal className="bpe">Blueprint to 3D</Reveal>
            <Reveal as="h2" delay=".1s">
              Your Plans, <em>Brought to Life in 3D</em>
            </Reveal>
            <Reveal as="p" delay=".2s">
              Real drawings from our projects. Tap any blueprint to step inside its interactive 3D model – rotate, zoom and switch views.
            </Reveal>
          </div>

          <div className="bpg4" id="bpg">
            {blueprints.map((bp, i) => (
              <BlueprintCard key={bp.file} blueprint={bp} index={i} onOpen={open} />
            ))}
          </div>
        </div>
        <i className="hl" />
      </section>

      {viewer && (
        <BlueprintViewer
          blueprints={blueprints}
          index={viewer.index}
          originRect={viewer.rect}
          onChange={(index) => setViewer((v) => ({ ...v, index }))}
          onClose={close}
        />
      )}
    </>
  );
}
