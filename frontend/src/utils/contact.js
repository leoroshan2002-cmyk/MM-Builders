/** "918015613840" -> "+91 8015613840" */
export const formatPhone = (digits = '') => `+${digits.slice(0, 2)} ${digits.slice(2)}`;

/** https://wa.me link that opens WhatsApp with a ready-made message */
export const whatsappLink = (phone, message) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

export const telLink = (digits) => `tel:+${digits}`;

export const mapsLink = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
