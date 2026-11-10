import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createEnquiry, getEnquiries, updateEnquiryStatus } from '../controllers/enquiryController.js';
import validateEnquiry from '../middleware/validateEnquiry.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

// Stops spam: max 10 enquiries per IP every 15 minutes
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many enquiries from this device. Please try again later.' },
});

router.post('/', enquiryLimiter, validateEnquiry, createEnquiry);
router.get('/', requireAdmin, getEnquiries);
router.patch('/:id/status', requireAdmin, updateEnquiryStatus);

export default router;
