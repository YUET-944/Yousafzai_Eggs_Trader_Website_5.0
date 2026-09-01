import Quote from '../Model/qoutes.js';

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
    return res.status(500).json({ 
      error: 'Server Validation Error: ' + error.message,
      code: 'VALIDATION_ERROR'
    });
  }
};