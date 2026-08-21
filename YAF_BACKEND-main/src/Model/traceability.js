import mongoose from 'mongoose';

const stageSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  time: {
    type: String, // e.g., "06:15 AM" or "Yesterday"
    required: true
  },
  order: {
    type: Number, // 1-based sequential position (1, 2, 3...)
    required: true
  }
});

const traceabilitySchema = new mongoose.Schema({
  brandId: {
    type: Number,
    required: true,
    unique: true // One pipeline per brand
  },
  stages: [stageSchema] // Array of nested milestone stages
}, { timestamps: true });

const Traceability = mongoose.model('Traceability', traceabilitySchema);
export default Traceability;