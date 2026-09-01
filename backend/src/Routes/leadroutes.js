import express from 'express';
import { submitLead, getLeads, updateLeadStatus } from '../Controllers/leadcontroller.js';
import { protect } from '../Middleware/Auth.js';

const router = express.Router();

// Public submission path AND Protected view path
router.route('/')
  .post(submitLead)       // Public: No middleware restriction!
  .get(protect, getLeads); // Protected: Requires user token validation

// Protected patch route to update form status
router.patch('/:id/status', protect, updateLeadStatus);

export default router;