import express from 'express';
import { createQuote } from '../Controllers/qoutecontroller.js';

const router = express.Router();

// Public submission path (No token required for standard web forms)
router.post('/', createQuote);

export default router;