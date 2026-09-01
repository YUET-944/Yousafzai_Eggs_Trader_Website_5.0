import express from 'express';
import { loginUser, getMe } from './../Controllers/auth.js';
import { protect } from './../Middleware/Auth.js';
const router = express.Router();

// Public login route
router.post('/login', loginUser);

// Protected profile route (Notice how 'protect' sits right before 'getMe')
router.get('/me', protect, getMe);

export default router;