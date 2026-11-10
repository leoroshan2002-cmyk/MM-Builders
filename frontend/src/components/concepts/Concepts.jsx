import { useRef, useState } from 'react';
import { useSite } from '../../context/SiteContext.jsx';
import Reveal from '../common/Reveal.jsx';
import ParticleLayer from '../common/ParticleLayer.jsx';
import DreamSpaceBand from '../contact/DreamSpaceBand.jsx';
import ConceptFilters from './ConceptFilters.jsx';
import ConceptCard from './ConceptCard.jsx';
import ConceptViewer from './ConceptViewer.jsx';

export default function Concepts() {
  const { concepts, conceptFilters } = useSite();
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [viewer, setViewer] = useState(null); // { index, rect, list }
  const opener = useRef(null);

  const isVisible = (c) => (filter === 'all' ? showAll || c.showByDefault : c.category === filter);

  const toggleAll = () => {
    setShowAll((v) => !v);
    setFilter('all');
  };

  const open = (index, button) => {
    opener.current = button;
    setViewer({
      index,
      rect: button.getBoundingClientRect(),
      list: concepts.map((c, i) => (isVisible(c) ? i : -1)).filter((i) => i >= 0),
    });
  };
  const close = () => {
    setViewer(null);
    opener.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <section id="concepts">
        <ParticleLayer mode="none" />
        <div className="w">
          <Reveal className="hd">
            <div>
              <div className="ey">Concept Designs</div>
              <h2 className="t">Architectural Concepts &amp; Design Possibilities</h2>
            </div>
            <button className="btn" id="va" style={{ color: 'var(--tx)' }} onClick={toggleAll}>
              {showAll ? 'Show Less' : 'View All →'}
            </button>
          </Reveal>

          <Reveal className="fl" id="fl">
            <ConceptFilters filters={conceptFilters} active={filter} onSelect={(key) => setFilter(key)} />
          </Reveal>

          <div className="g4" id="gal">
            {concepts.map((concept, i) => (
              <ConceptCard key={concept.slug} concept={concept} index={i} hidden={!isVisible(concept)} viewerOpen={!!viewer} onOpen={open} />
            ))}
          </div>
          <p className="nt">Illustrative concept designs, not completed client projects.</p>

          <DreamSpaceBand />
        </div>
        <i className="hl" />
      </section>

      {viewer && (
        <ConceptViewer
          concepts={concepts}
          list={viewer.list}
          index={viewer.index}
          originRect={viewer.rect}
          onChange={(index) => setViewer((v) => ({ ...v, index }))}
          onClose={close}
        />
      )}
    </>
  );
}
