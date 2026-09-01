import express from 'express';
import { getTraceability, updateTraceability } from '../Controllers/traceabilitycontroller.js';
import { protect } from '../Middleware/Auth.js';

const router = express.Router();

router.route('/:brandId')
  .get(getTraceability)              // Public website view: no login token required
  .put(protect, updateTraceability); // Dashboard management: requires valid login token

export default router;