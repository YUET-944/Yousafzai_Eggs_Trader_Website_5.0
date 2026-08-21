import Product from '../Model/products.js';

// @desc    Get all products (Scoped automatically by role/brand)
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    let query = {};

    // RBAC Scope Check: If the user is a BrandManager, force filter by their brandId
    if (req.user.role === 'BrandManager') {
      query.brandId = req.user.brandId;
    } else if (req.user.role === 'SuperAdmin' && req.query.brandId !== undefined) {
      // If SuperAdmin passes a specific ?brandId=1 query parameter
      query.brandId = Number(req.query.brandId);
    }

    const products = await Product.find(query);

    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
export const createProduct = async (req, res) => {
  const { title, description, tags, icon, brandId } = req.body;

  try {
    // Security Rule: BrandManager can ONLY create a product for their own brand
    let targetBrandId = brandId;
    if (req.user.role === 'BrandManager') {
      targetBrandId = req.user.brandId;
    }

    const newProduct = await Product.create({
      title,
      description,
      tags,
      icon,
      brandId: targetBrandId
    });

    return res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Security Rule: BrandManager cannot edit products belonging to other brands
    if (req.user.role === 'BrandManager' && product.brandId !== req.user.brandId) {
      return res.status(403).json({ success: false, message: 'Not authorized to manage this brand' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Security Rule: BrandManager cannot delete products belonging to other brands
    if (req.user.role === 'BrandManager' && product.brandId !== req.user.brandId) {
      return res.status(403).json({ success: false, message: 'Not authorized to manage this brand' });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {}
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};