import HttpError from '../utils/HttpError.js';

/** Checks and cleans the enquiry form before it reaches the controller. */
export default function validateEnquiry(req, res, next) {
  const { name = '', phone = '', message = '', service = '' } = req.body || {};
  const errors = [];

  const cleanName = String(name).trim();
  const cleanPhone = String(phone).trim();

  if (cleanName.length < 2) errors.push('Please enter your name');
  if (!/^[+\d][\d\s()-]{6,24}$/.test(cleanPhone)) errors.push('Please enter a valid phone number');
  if (String(message).length > 2000) errors.push('Message is too long (max 2000 characters)');

  if (errors.length) return next(new HttpError(400, 'Validation failed', errors));

  req.body = {
    name: cleanName,
    phone: cleanPhone,
    message: String(message).trim(),
    service: String(service).trim(),
  };
  next();
}
