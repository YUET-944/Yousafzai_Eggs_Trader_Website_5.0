import express from 'express';
import { uploadFile, uploadParser } from '../Controllers/uploadcontroller.js';
import { protect } from '../Middleware/Auth.js';

const router = express.Router();

// Protected: Only authenticated staff can upload system image files
router.post('/', protect, uploadParser.single('file'), uploadFile);

export default router;