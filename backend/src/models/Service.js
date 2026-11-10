import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true, unique: true }, // 1..n, also shown as "01", "02" …
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true, trim: true }, // short text on the card
    description: { type: String, required: true, trim: true }, // long text in the "Know More" dialog
    offerings: [{ type: String, trim: true }], // "What we offer" list
    deliverables: [{ type: String, trim: true }], // "Typical deliverables" chips
    image: { type: String, required: true }, // public path, e.g. /images/services/xyz.jpg
    iconKey: { type: String, required: true }, // which SVG icon the frontend should draw
    cut: { type: String, default: '12%' }, // CSS clip value used by the card image
    imageStyle: { type: String, enum: ['arch', 'plain', 'full'], default: 'plain' },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
