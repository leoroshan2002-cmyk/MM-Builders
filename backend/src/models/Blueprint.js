import mongoose from 'mongoose';

const blueprintSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true }, // "Dr. Vijay Residence"
    subtitle: { type: String, required: true, trim: true }, // "Plumbing Layout · Sathyamangalam"
    description: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    thumbnail: { type: String, required: true }, // flat blueprint picture
    thumbnailAlt: { type: String, default: '' },
    file: { type: String, required: true }, // interactive 3D page, e.g. /blueprints/xyz.html
  },
  { timestamps: true }
);

export default mongoose.model('Blueprint', blueprintSchema);
