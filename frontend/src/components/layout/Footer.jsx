import { NAV_LINKS } from '../../data/navLinks.js';
import { useSite } from '../../context/SiteContext.jsx';
import { useUi } from '../../context/UiContext.js';
import { whatsappLink } from '../../utils/contact.js';
import useInView from '../../hooks/useInView.js';
import ParticleLayer from '../common/ParticleLayer.jsx';

export default function Footer() {
  const { settings } = useSite();
  const { toast } = useUi();
  const [brandRef, brandSeen] = useInView({ threshold: 0.3 });

  const soon = (name) => (e) => {
    e.preventDefault();
    toast(`${name} link not configured yet`);
  };

  return (
    <footer>
      <ParticleLayer mode="star" blobs={false} className="nomask" />
      <div className="w">
        <div className="top">
          <a ref={brandRef} className={`fbrand${brandSeen ? ' lr' : ''}`} href="#home" aria-label="MM Builders & Infrastructure">
            <img src="/images/logo.webp" alt="MM Builders & Infrastructure" />
            <span className="fbt">
              <b>MM Builders</b>
              <i>&amp; Infrastructure</i>
            </span>
          </a>

          <nav aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="fr">
            <a href="#" onClick={soon('Instagram')}>Instagram</a>
            <a target="_blank" rel="noopener" href={whatsappLink(settings.primaryPhone, settings.whatsappMessage)}>
              WhatsApp
            </a>
            <a href="#" onClick={soon('LinkedIn')}>LinkedIn</a>
            <a className="circ" href="#home" aria-label="Back to top" style={{ width: 38, height: 38, borderColor: 'var(--gold)', color: 'var(--gold)' }}>
              ↑
            </a>
          </div>
        </div>

        <div className="cp">
          <span>© 2026 MM Builders &amp; Infrastructure. All Rights Reserved.</span>
          <span>Building Your Vision. Creating Your Future.</span>
        </div>
      </div>
    </footer>
  );
}
