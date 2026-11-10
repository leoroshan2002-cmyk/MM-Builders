import Enquiry, { ENQUIRY_STATUSES } from '../models/Enquiry.js';
import asyncHandler from '../utils/asyncHandler.js';
import HttpError from '../utils/HttpError.js';

// POST /api/enquiries   (public – used by the enquiry dialog)
export const createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Enquiry received. We will get in touch soon.',
    data: { id: enquiry._id },
  });
});

// GET /api/enquiries   (private – needs x-api-key)
export const getEnquiries = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const enquiries = await Enquiry.find(filter).sort('-createdAt').lean();
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

// PATCH /api/enquiries/:id/status   (private)
export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body || {};
  if (!ENQUIRY_STATUSES.includes(status)) {
    throw new HttpError(400, `Status must be one of: ${ENQUIRY_STATUSES.join(', ')}`);
  }
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!enquiry) throw new HttpError(404, 'Enquiry not found');
  res.json({ success: true, data: enquiry });
});
