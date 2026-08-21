import mongoose from 'mongoose';

const cmsSchema = new mongoose.Schema({
  sectionKey: {
    type: String,
    required: true,
    unique: true, // Example values: 'hero', 'about', 'products', 'solutions'
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Allows dynamic nested JSON structures directly from the contract
    required: true
  }
}, { timestamps: true });

const Cms = mongoose.model('Cms', cmsSchema);
export default Cms;