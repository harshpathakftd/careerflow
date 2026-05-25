import express from 'express';
import { getJobs, getJobById, createJob } from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.use(protect);
router.get('/', asyncHandler(getJobs));
router.get('/:id', asyncHandler(getJobById));
router.post('/', asyncHandler(createJob));

export default router;
