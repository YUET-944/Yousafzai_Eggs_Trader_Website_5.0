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

    // Build the dynamic application document
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
      id: `quote-${newQuote._id}`,
      message: "Quote request received. You'll receive a formal quotation within 4 business hours."
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Please check the submitted quote details.',
        code: 'VALIDATION_ERROR'
      });
    }

    console.error('Quote submission failed:', error);
    return res.status(500).json({
      error: 'Unable to submit quote request right now.',
      code: 'INTERNAL_ERROR'
    });
  }
};
