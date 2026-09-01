import express from 'express';
import { getSection, updateSection, getAllCms, bulkUpdateCms } from '../Controllers/cmscontroller.js';
import { protect } from '../Middleware/Auth.js'; // Uses your established token protection

const router = express.Router();

// Bulk Sync Routes (Must stay above parameterized static routes so 'all' isn't treated as a sectionKey)
router.route('/all')
  .get(getAllCms)
  .put(protect, bulkUpdateCms);

// Dynamic Section Handlers (e.g., /api/cms/hero, /api/cms/about)
router.route('/:sectionKey')
  .get(getSection)
  .put(protect, updateSection);

export default router;