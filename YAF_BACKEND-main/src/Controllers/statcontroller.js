import Product from '../Model/products.js';
import Lead from '../Model/lead.js';

// @desc    Get dashboard metrics and counts (Scoped automatically by role/brand)
// @route   GET /api/stats
export const getDashboardStats = async (req, res) => {
  try {
    let query = {};

    // 1. Enforce RBAC Filter Scope
    if (req.user.role === 'BrandManager') {
      // Brand Managers are locked strictly to their assigned brandId
      query.brandId = req.user.brandId;
    }
    // If the user is SuperAdmin, query stays empty {} so it aggregates everything globally!

    // 2. Count the products matching our scope
    const totalProducts = await Product.countDocuments(query);

    // 3. Count total leads matching our scope
    const totalLeads = await Lead.countDocuments(query);

    // 4. Count specifically 'new' unread leads matching our scope
    const newLeadsQuery = { ...query, status: 'new' };
    const newLeadsCount = await Lead.countDocuments(newLeadsQuery);

    // 5. Send back the response matching your specification envelope layout
    return res.status(200).json({
      success: true,
      data: {
        products: totalProducts,
        leads: totalLeads,
        newLeads: newLeadsCount
      }
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Server Error: ' + error.message 
    });
  }
};