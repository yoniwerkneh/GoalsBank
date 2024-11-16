import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/user.js';
import { authenticate } from '../middleware/auth.js';
import { validateProfileUpdate } from '../middleware/validation.js';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateProfileUpdate, updateProfile);

export default router;