import express from 'express';
import { getDashboardStats } from '../Controllers/statcontroller.js';
import { protect } from '../Middleware/Auth.js';

const router = express.Router();

// Protected dashboard aggregation stats endpoint
router.get('/', protect, getDashboardStats);

export default router;