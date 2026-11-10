import mongoose from 'mongoose';

export const CONCEPT_CATEGORIES = ['res', 'com', 'int', '3d', 'plan'];

const conceptSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, enum: CONCEPT_CATEGORIES },
    image: { type: String, required: true }, // poster / thumbnail
    video: { type: String, required: true }, // preview + viewer video
    fit: { type: String, enum: ['cover', 'contain'], default: 'cover' },
    showByDefault: { type: Boolean, default: true }, // false = only after "View All"
  },
  { timestamps: true }
);

export default mongoose.model('Concept', conceptSchema);
