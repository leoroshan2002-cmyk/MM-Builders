import { useSite } from '../../context/SiteContext.jsx';
import { useUi } from '../../context/UiContext.js';
import { formatPhone, mapsLink, telLink, whatsappLink } from '../../utils/contact.js';
import useInView from '../../hooks/useInView.js';
import ImageSlot from '../common/ImageSlot.jsx';
import ParticleLayer from '../common/ParticleLayer.jsx';
import { InstagramIcon, LinkedInIcon, MapPinIcon, WhatsAppIcon } from '../common/Icons.jsx';

export default function Contact() {
  const { settings } = useSite();
  const { openEnquiry, toast } = useUi();
  const [ref, inView] = useInView();

  const soon = (name) => (e) => {
    e.preventDefault();
    toast(`${name} link not configured yet`);
  };

  return (
    <section id="contact" style={{ paddingTop: 0 }}>
      <ParticleLayer mode="wave" extras={['r r1']} />
      <div className="w">
        <div ref={ref} className={`git rv${inView ? ' in' : ''}`}>
          <div>
            <div className="ey" style={{ color: 'var(--gold)' }}>Get in Touch</div>
            <h3>Start Your Project Today</h3>
            <p>
              📞 <a href={telLink(settings.primaryPhone)}>{formatPhone(settings.primaryPhone)}</a> &nbsp;{' '}
              {settings.secondaryPhone && <a href={telLink(settings.secondaryPhone)}>{formatPhone(settings.secondaryPhone)}</a>}
            </p>
            <p>
              📍 <span>{settings.address}</span>
            </p>

            <div className="soc">
              <a href="#" aria-label="Instagram" onClick={soon('Instagram')}>
                <InstagramIcon />
              </a>
              <a target="_blank" rel="noopener" href={whatsappLink(settings.primaryPhone, settings.whatsappMessage)} aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href="#" aria-label="LinkedIn" onClick={soon('LinkedIn')}>
                <LinkedInIcon />
              </a>
              <a target="_blank" rel="noopener" href={mapsLink(settings.address)} aria-label="Google Maps">
                <MapPinIcon />
              </a>
            </div>

            <button className="btn f" onClick={() => openEnquiry('Send an Enquiry')}>
              Send an Enquiry →
            </button>
          </div>

          <ImageSlot name="contact-side" alt="Interior plant detail" size="900×700" src="/images/contact-side.webp" dark />
          <i className="orb" />
        </div>
      </div>
      <i className="hl" />
    </section>
  );
}
