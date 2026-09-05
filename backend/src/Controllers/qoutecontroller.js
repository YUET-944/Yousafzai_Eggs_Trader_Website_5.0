import Quote from '../Model/qoutes.js';

const requiredQuoteFields = [
  'companyName',
  'industry',
  'contactName',
  'jobTitle',
  'email',
  'phone',
  'productType',
  'weeklyVolume',
  'deliveryLocation'
];

const isBlank = (value) => typeof value !== 'string' || !value.trim();

// @desc    Submit a B2B Quote / Contact Form
// @route   POST /api/quotes
export const createQuote = async (req, res) => {
  try {
    const {
      companyName,
      industry,
      contactName,
      jobTitle,
      email,
      phone,
      productType,
      weeklyVolume,
      deliveryLocation,
      notes
    } = req.body;

    const missingField = requiredQuoteFields.find((field) => isBlank(req.body?.[field]));
    if (missingField) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create record in MySQL database
    const newQuote = await Quote.create({
      companyName,
      industry,
      contactName,
      jobTitle,
      email,
      phone,
      productType,
      weeklyVolume,
      deliveryLocation,
      notes
    });

    // Match output format exactly to contract spec section 3
    return res.status(201).json({
      id: `quote-${newQuote.id}`,
      message: "Quote request received. You'll receive a formal quotation within 4 business hours."
    });

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: error.errors?.[0]?.message || 'Invalid quote data'
      });
    }

    return res.status(500).json({ 
      success: false,
      message: 'Server Error: ' + error.message
    });
  }
};
