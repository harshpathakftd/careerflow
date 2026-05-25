import Job from '../models/Job.js';
import User from '../models/User.js';
import { calculateMatchScore } from '../utils/matchScore.js';

export const getJobs = async (req, res) => {
  const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 }).limit(50);
  const user = await User.findById(req.user._id);

  const withScores = jobs.map((job) => ({
    ...job.toObject(),
    matchScore: calculateMatchScore(user?.skills, job.skillsRequired),
  }));

  withScores.sort((a, b) => b.matchScore - a.matchScore);
  res.json(withScores);
};

export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  const user = await User.findById(req.user._id);
  res.json({
    ...job.toObject(),
    matchScore: calculateMatchScore(user?.skills, job.skillsRequired),
  });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
};
