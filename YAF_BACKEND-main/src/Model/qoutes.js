import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    enum: [
      'Hotel / Restaurant / Cafe', 
      'Bakery / Confectionery', 
      'Retail / Supermarket', 
      'Food Manufacturer', 
      'Hospital / Institution', 
      'Other'
    ], // Matches contract industry list precisely
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  productType: {
    type: String,
    enum: [
      'Commercial Grade A White', 
      'Free-Range Brown', 
      'Certified Organic', 
      'Processing Grade', 
      'Mixed / Multiple'
    ], // Matches contract item variations precisely
    required: true
  },
  weeklyVolume: {
    type: String,
    enum: ['Under 50', '50-199', '200-499', '500-1,999', '2,000+'],
    required: true
  },
  deliveryLocation: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;
