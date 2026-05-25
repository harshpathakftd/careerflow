import express from 'express';
import {
  getApplications,
  applyToJob,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/auth.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.use(protect);
router.get('/', asyncHandler(getApplications));
router.post('/apply/:jobId', asyncHandler(applyToJob));
router.patch('/:id', asyncHandler(updateApplicationStatus));

export default router;
