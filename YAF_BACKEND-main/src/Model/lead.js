import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['contact', 'b2bQuote'],
    required: true
  },
  brandId: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new'
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;