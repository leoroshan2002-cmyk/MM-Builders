import { useState } from 'react';
import { NAV_LINKS } from '../../data/navLinks.js';
import useWindowScroll from '../../hooks/useWindowScroll.js';

/** Fixed top bar: logo, section links (highlighting the section you are in) and the mobile menu. */
export default function Header({ introDone }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useWindowScroll(() => {
    setScrolled(window.scrollY > 40);
    let current = 0;
    NAV_LINKS.forEach((link, i) => {
      const section = document.getElementById(link.id);
      if (section && section.getBoundingClientRect().top < window.innerHeight * 0.4) current = i;
    });
    setActive(current);
  });

  return (
    <header id="hd" className={scrolled ? 's' : ''}>
      <div className="w">
        <a className="brand" href="#home" aria-label="MM Builders home">
          <img className={introDone ? 'lr' : ''} src="/images/logo.webp" alt="MM Builders & Infrastructure" />
          <span className="bt" aria-hidden="true">
            MM BUILDERS<small>&amp; INFRASTRUCTURE</small>
          </span>
        </a>

        <button id="mb" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav id="nav" aria-label="Main" className={menuOpen ? 'o' : ''} onClick={(e) => e.target.closest('a') && setMenuOpen(false)}>
          {NAV_LINKS.map((link, i) => (
            <a key={link.id} href={`#${link.id}`} className={i === active ? 'on' : undefined}>
              {link.label}
            </a>
          ))}
          <a className="btn l" href="#contact">
            Get a Consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
