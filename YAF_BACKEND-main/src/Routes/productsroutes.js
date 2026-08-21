import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../Controllers/productcontroller.js';
import { protect } from '../Middleware/Auth.js';

const router = express.Router();

// All routes here are protected behind 'protect'
router.route('/')
  .get(protect, getProducts)
  .post(protect, createProduct);

router.route('/:id')
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;