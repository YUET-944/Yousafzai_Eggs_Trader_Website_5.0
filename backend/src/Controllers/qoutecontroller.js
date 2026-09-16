import Quote from '../Model/qoutes.js';

const requiredQuoteFields = [
  'contactName',
  'email',
  'phone',
  'productType',
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
      companyName: companyName && companyName.trim() ? companyName.trim() : 'Not Specified',
      industry: industry && industry.trim() ? industry.trim() : 'General Inquiry',
      contactName: contactName.trim(),
      jobTitle: jobTitle && jobTitle.trim() ? jobTitle.trim() : 'Buyer / Customer',
      email: email.trim(),
      phone: phone.trim(),
      productType: productType.trim(),
      weeklyVolume: weeklyVolume && weeklyVolume.trim() ? weeklyVolume.trim() : 'Not Specified',
      deliveryLocation: deliveryLocation.trim(),
      notes: notes ? notes.trim() : ''
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

// @desc    Get all quote requests
// @route   GET /api/quotes
export const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(quotes);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message
    });
  }
};

// @desc    Delete a quote request
// @route   DELETE /api/quotes/:id
export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByPk(id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote request not found'
      });
    }

    await quote.destroy();
    return res.status(200).json({
      success: true,
      message: 'Quote request deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message
    });
  }
};
