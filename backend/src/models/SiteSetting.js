import mongoose from 'mongoose';

/**
 * Single document that holds the company contact details.
 * Phone numbers are stored digits-only with country code (e.g. 918015613840).
 */
const siteSettingSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true },
    primaryPhone: { type: String, required: true },
    secondaryPhone: { type: String, default: '' },
    address: { type: String, required: true },
    whatsappMessage: { type: String, default: 'Hello MM Builders, I would like to discuss a project.' },
  },
  { timestamps: true }
);

export default mongoose.model('SiteSetting', siteSettingSchema);
