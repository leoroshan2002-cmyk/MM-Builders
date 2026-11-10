import mongoose from 'mongoose';

export const ENQUIRY_STATUSES = ['new', 'contacted', 'closed'];

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    message: { type: String, default: '', trim: true, maxlength: 2000 },
    service: { type: String, default: '', trim: true, maxlength: 120 }, // set when sent from a service dialog
    status: { type: String, enum: ENQUIRY_STATUSES, default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', enquirySchema);
