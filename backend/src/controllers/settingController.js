import SiteSetting from '../models/SiteSetting.js';
import asyncHandler from '../utils/asyncHandler.js';
import HttpError from '../utils/HttpError.js';

// GET /api/settings
export const getSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSetting.findOne({ key: 'main' }).lean();
  if (!settings) throw new HttpError(404, 'Settings not found. Run "npm run seed".');
  res.json({ success: true, data: settings });
});
