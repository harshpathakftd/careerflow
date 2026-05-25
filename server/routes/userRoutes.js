import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.use(protect);
router.put('/profile', asyncHandler(updateProfile));

export default router;
