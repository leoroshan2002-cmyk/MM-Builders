import Blueprint from '../models/Blueprint.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/blueprints
export const getBlueprints = asyncHandler(async (req, res) => {
  const blueprints = await Blueprint.find().sort('order').lean();
  res.json({ success: true, count: blueprints.length, data: blueprints });
});
