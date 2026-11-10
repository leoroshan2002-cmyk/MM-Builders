import { useState } from 'react';
import { useSite } from '../../context/SiteContext.jsx';
import { useUi } from '../../context/UiContext.js';
import { sendEnquiry } from '../../services/api.js';
import { whatsappLink } from '../../utils/contact.js';

/**
 * Enquiry dialog content. On submit it:
 *   1. opens WhatsApp with the visitor's details (same as the original site), and
 *   2. saves the enquiry in MongoDB through the API (silently – never blocks WhatsApp).
 */
export default function EnquiryForm({ title, initialMessage = '', service = '', onDone }) {
  const { settings } = useSite();
  const { toast } = useUi();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(initialMessage);

  const submit = () => {
    const n = name.trim();
    const p = phone.trim();
    if (!n || !p) {
      toast('Please enter name and phone');
      return;
    }
    window.open(whatsappLink(settings.primaryPhone, `Hello MM Builders, I'm ${n} (${p}). ${message}`), '_blank');
    sendEnquiry({ name: n, phone: p, message, service }).catch((err) => console.warn('Enquiry not saved:', err.message));
    onDone();
  };

  return (
    <>
      <h3>{title}</h3>
      <p>Share your details; we'll continue on WhatsApp.</p>
      <input placeholder="Your name" aria-label="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="tel" placeholder="Phone number" aria-label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <textarea rows={3} placeholder="Tell us about your project" aria-label="Project details" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="btn f" onClick={submit}>
        Continue on WhatsApp
      </button>
    </>
  );
}
