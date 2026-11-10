import Service from '../models/Service.js';
import Concept from '../models/Concept.js';
import Blueprint from '../models/Blueprint.js';
import SiteSetting from '../models/SiteSetting.js';
import { conceptFilters } from '../data/siteData.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * GET /api/site
 * Everything the home page needs in a single request.
 */
export const getSiteContent = asyncHandler(async (req, res) => {
  const [settings, services, concepts, blueprints] = await Promise.all([
    SiteSetting.findOne({ key: 'main' }).lean(),
    Service.find().sort('order').lean(),
    Concept.find().sort('order').lean(),
    Blueprint.find().sort('order').lean(),
  ]);

  res.json({
    success: true,
    data: { settings, services, concepts, conceptFilters, blueprints },
  });
});
