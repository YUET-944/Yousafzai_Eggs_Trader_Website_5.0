import Lead from '../Model/lead.js';

// ==========================================
// PUBLIC ENDPOINT (NO AUTH REQUIRED)
// ==========================================

// @desc    Submit a public contact or quote form
// @route   POST /api/leads
// @desc    Submit a public contact or quote form
// @route   POST /api/leads
export const submitLead = async (req, res) => {
  const { type, brandId, data } = req.body;

  try {
    // Extract top-level fields from data object if present
    const name = req.body.name || data?.name || null;
    const email = req.body.email || data?.email || null;
    const phone = req.body.phone || data?.phone || null;
    const message = req.body.message || data?.message || null;

    const newLead = await Lead.create({
      name,
      email,
      phone,
      message,
      type: type || 'contact',
      brandId: brandId !== undefined ? Number(brandId) : null,
      data: data || null
    });

    return res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: newLead
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};


// ==========================================
// PROTECTED ENDPOINTS (REQUIRES AUTH TOKEN)
// ==========================================

// @desc    Get all leads (Scoped automatically by role/brand)
// @route   GET /api/leads
export const getLeads = async (req, res) => {
  try {
    let whereQuery = {};

    // Security Filter: BrandManager can only see forms submitted to their brand
    if (req.user.role === 'BrandManager') {
      whereQuery.brandId = req.user.brandId;
    } else if (req.user.role === 'SuperAdmin' && req.query.brandId !== undefined) {
      // SuperAdmin filtering down by query params optionally (?brandId=0)
      whereQuery.brandId = Number(req.query.brandId);
    }

    const leads = await Lead.findAll({
      where: whereQuery,
      order: [['createdAt', 'DESC']] // Newest leads first
    });

    return res.status(200).json({
      success: true,
      data: leads
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Update lead status (e.g., mark as read, closed)
// @route   PATCH /api/leads/:id/status
export const updateLeadStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    // Security Check: BrandManager cannot modify leads belonging to other brands
    if (req.user.role === 'BrandManager' && lead.brandId !== req.user.brandId) {
      return res.status(403).json({ success: false, message: 'Not authorized to manage this brand\'s inbox' });
    }

    // Validate incoming status string against allowed choices
    if (!['new', 'read', 'replied', 'closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    lead.status = status;
    await lead.save();

    return res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};