import { useRef } from 'react';
import useInView from '../../hooks/useInView.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import useWindowScroll from '../../hooks/useWindowScroll.js';
import Reveal from '../common/Reveal.jsx';
import ParticleLayer from '../common/ParticleLayer.jsx';
import { ArrowRightIcon } from '../common/Icons.jsx';
import AboutSymbols from './AboutSymbols.jsx';
import FeatureStrip from './FeatureStrip.jsx';
import RotatingBadge from './RotatingBadge.jsx';
import FounderCard from './FounderCard.jsx';

const QUOTE = '“We believe every space has a story. Our goal is to help you bring that story to life with thoughtful design and reliable construction.”';
const TAGLINE = ['DESIGN', 'PLAN', 'BUILD', 'BELONG'];

// [left %, top %, size px, delay step] – the little gold dots floating over the text column
const DOTS = [
  [14, 8, 10, 0],
  [68, 14, 7, 2],
  [82, 58, 12, 1],
  [40, 70, 6, 3],
  [8, 52, 8, 4],
];

export default function About() {
  const reduced = useReducedMotion();
  const photoRef = useRef(null);
  const [picRef, picIn] = useInView();
  const [txtRef, txtIn] = useInView();
  const [introRef, introIn] = useInView();
  const [quoteRef, quoteIn] = useInView();
  const [sectionRef, started] = useInView({ threshold: 0, rootMargin: '0px 0px -12% 0px' });

  // `started` becomes true once the section is near the viewport: it starts the heading / line animations

  // Gentle parallax on the photo
  useWindowScroll(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    if (!section || !photo || reduced) return;
    const r = section.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
    photo.style.setProperty('--py', `${(p * -34).toFixed(1)}px`);
  });

  const words = QUOTE.split(/\s+/);

  return (
    <section id="about" className={`a2${started ? ' a2go' : ''}`} ref={sectionRef}>
      <ParticleLayer mode="net" extras={['r r1', 'r r2']} />
      <AboutSymbols />

      <div className="a2-top">
        <aside className="a2-side" aria-hidden="true">
          <i className="a2-ln" />
          <b>01</b>
          <span>
            OUR <br />
            STORY
          </span>
        </aside>

        <div ref={picRef} className={`a2-pic rv${picIn ? ' in' : ''}`}>
          <div className="a2-arch" />
          <div className="a2-ph" ref={photoRef}>
            <img alt="Modern villa lit up at dusk" decoding="async" src="/images/hero-lit.webp" />
          </div>
          <FeatureStrip />
          <RotatingBadge />
        </div>

        <div ref={txtRef} className={`a2-txt rv${txtIn ? ' in' : ''}`} style={{ '--d': '.15s' }}>
          <svg className="a2-palm" aria-hidden="true">
            <use href="#a2palm" />
          </svg>
          <svg className="a2-sk" aria-hidden="true">
            <use href="#a2sk" />
          </svg>
          <i className="a2-vl" />
          <i className="a2-dl" />

          <div className="a2-ey">About MM Builders</div>

          <h2>
            <span className="ln" style={{ '--n': 0 }}>
              <span>Spaces Built</span>
            </span>
            <span className="ln" style={{ '--n': 1 }}>
              <span>
                for a <em>Better Tomorrow</em>
              </span>
            </span>
          </h2>

          <p>
            MM Builders &amp; Infrastructure is focused on helping clients plan, design, and build spaces that reflect their needs, aspirations and practical requirements.
          </p>

          <a className="a2-btn" href="#team">
            Know Our Story <ArrowRightIcon />
          </a>

          <div className="a2-tag" aria-hidden="true">
            {TAGLINE.map((word, k) => (
              <span key={word}>
                {k > 0 && (
                  <>
                    {' '}
                    <u>|</u>{' '}
                  </>
                )}
                <span className="tg" style={{ '--k': k }}>
                  {word}
                </span>
              </span>
            ))}
          </div>

          {!reduced &&
            DOTS.map(([x, y, size, d]) => (
              <i key={`${x}-${y}`} className="a2-dot" style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, animationDelay: `-${d * 1.7}s` }} />
            ))}
        </div>
      </div>

      <div className="a2-bot" id="team">
        <div ref={introRef} className={`a2-fh rv${introIn ? ' in' : ''}`}>
          <svg className="a2-leaf" aria-hidden="true">
            <use href="#a2leaf" />
          </svg>
          <div className="a2-ey a2-ey2">Our Founders</div>
          <h3>
            <span className="ln" style={{ '--n': 0 }}>
              <span>Built on Vision.</span>
            </span>
            <span className="ln" style={{ '--n': 1 }}>
              <span>
                <em>Driven by Trust.</em>
              </span>
            </span>
          </h3>
          <i className="a2-gl" />
          <p>
            Two minds. One purpose.
            <br />
            Creating spaces that inspire
            <br />
            better living.
          </p>
        </div>

        <FounderCard name="Ragavi Muthuraman" role="Founder & CEO" variant="c1" delay=".1s" />
        <FounderCard name="Vanniyaraj" role="Co-Founder" variant="c2" delay=".2s" />

        <div ref={quoteRef} className={`a2-q rv${quoteIn ? ' in' : ''}`} style={{ '--d': '.3s' }}>
          <span className="a2-qm" aria-hidden="true">&ldquo;</span>
          <blockquote>
            {words.map((word, i) => (
              <span key={i}>
                {i > 0 && ' '}
                <span className="qw" style={{ '--w': i }}>
                  {word}
                </span>
              </span>
            ))}
            <cite>Ragavi Muthuraman &amp; Vanniyaraj</cite>
          </blockquote>
          <img className="a2-in" src="/images/about-interior.webp" alt="Warm wood-finished interior with a plant" loading="lazy" decoding="async" />
        </div>
      </div>

      <i className="hl" />
    </section>
  );
}
