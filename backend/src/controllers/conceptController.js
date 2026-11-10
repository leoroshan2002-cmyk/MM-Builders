import Concept, { CONCEPT_CATEGORIES } from '../models/Concept.js';
import asyncHandler from '../utils/asyncHandler.js';
import HttpError from '../utils/HttpError.js';

// GET /api/concepts?category=res
export const getConcepts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all' && !CONCEPT_CATEGORIES.includes(category)) {
    throw new HttpError(400, `Unknown category. Use one of: all, ${CONCEPT_CATEGORIES.join(', ')}`);
  }
  const filter = category && category !== 'all' ? { category } : {};
  const concepts = await Concept.find(filter).sort('order').lean();
  res.json({ success: true, count: concepts.length, data: concepts });
});
