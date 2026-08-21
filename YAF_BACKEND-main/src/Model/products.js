import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String], // Array of strings (e.g., ["organic", "fresh"])
    default: []
  },
  icon: {
    type: String,  // Handles emoji strings like "🥚" or "🚜"
    required: true
  },
  brandId: {
    type: Number,  // 0 = Corporate, 1 = Trade, 2 = Supply
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;