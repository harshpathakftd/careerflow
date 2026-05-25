import express from 'express';
import {
  uploadResume,
  getResumes,
  optimizeResumeHandler,
  generateCoverLetterHandler,
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';
import { uploadResume as uploadMiddleware } from '../middleware/upload.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.use(protect);
router.get('/', asyncHandler(getResumes));
router.post('/upload', uploadMiddleware.single('resume'), asyncHandler(uploadResume));
router.post('/:id/optimize', asyncHandler(optimizeResumeHandler));
router.post('/cover-letter', asyncHandler(generateCoverLetterHandler));

export default router;
