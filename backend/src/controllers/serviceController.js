import Service from '../models/Service.js';
import asyncHandler from '../utils/asyncHandler.js';
import HttpError from '../utils/HttpError.js';

// GET /api/services
export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort('order').lean();
  res.json({ success: true, count: services.length, data: services });
});

// GET /api/services/:slug
export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug.toLowerCase() }).lean();
  if (!service) throw new HttpError(404, 'Service not found');
  res.json({ success: true, data: service });
});
