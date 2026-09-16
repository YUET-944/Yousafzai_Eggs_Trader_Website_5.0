import express from 'express';
import { createQuote, getQuotes, deleteQuote } from '../Controllers/qoutecontroller.js';

const router = express.Router();

// Public submission path (No token required for standard web forms)
router.post('/', createQuote);

// Admin / protected quote management routes
router.get('/', getQuotes);
router.delete('/:id', deleteQuote);

export default router;