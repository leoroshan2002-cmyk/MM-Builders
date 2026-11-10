import crypto from 'node:crypto';
import env from '../config/env.js';
import HttpError from '../utils/HttpError.js';

const safeEqual = (a, b) => {
  const A = Buffer.from(String(a));
  const B = Buffer.from(String(b));
  return A.length === B.length && crypto.timingSafeEqual(A, B);
};

/** Protects private routes (reading enquiries). Send the key in the `x-api-key` header. */
export default function requireAdmin(req, res, next) {
  if (!env.adminApiKey) {
    return next(new HttpError(503, 'Admin access is disabled: set ADMIN_API_KEY in .env'));
  }
  if (!safeEqual(req.get('x-api-key') || '', env.adminApiKey)) {
    return next(new HttpError(401, 'Invalid or missing API key'));
  }
  next();
}
