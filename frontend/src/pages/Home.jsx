import { useCallback, useEffect, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion.js';
import IntroSequence from '../components/intro/IntroSequence.jsx';
import ScrollProgress from '../components/layout/ScrollProgress.jsx';
import PageCurtain from '../components/layout/PageCurtain.jsx';
import Spotlight from '../components/layout/Spotlight.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../components/hero/Hero.jsx';
import About from '../components/about/About.jsx';
import Services from '../components/services/Services.jsx';
import Blueprints from '../components/blueprints/Blueprints.jsx';
import Concepts from '../components/concepts/Concepts.jsx';
import Approach from '../components/approach/Approach.jsx';
import Contact from '../components/contact/Contact.jsx';

/**
 * The one-page MM Builders website.
 * The intro plays first; when it ends the page unlocks and the hero lights come on.
 * (Visitors who prefer reduced motion skip the intro.)
 */
export default function Home() {
  const reduced = useReducedMotion();
  const [introDone, setIntroDone] = useState(reduced);

  useEffect(() => {
    document.body.classList.toggle('lock', !introDone);
    if (introDone) document.body.classList.add('go');
  }, [introDone]);

  const finishIntro = useCallback(() => setIntroDone(true), []);

  return (
    <>
      <ScrollProgress />
      <PageCurtain />
      <Spotlight />

      {!reduced && <IntroSequence onFinish={finishIntro} />}

      <Header introDone={introDone} />

      <main id="home">
        <Hero started={introDone} />
        <About />
        <Services />
        <Blueprints />
        <Concepts />
        <Approach />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
