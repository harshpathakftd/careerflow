import Resume from '../models/Resume.js';
import { optimizeResume, generateCoverLetter } from '../services/ai/aiService.js';

export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Resume file required' });
  }

  const resume = await Resume.create({
    user: req.user._id,
    originalFile: `/uploads/${req.file.filename}`,
  });

  res.status(201).json(resume);
};

export const getResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(resumes);
};

export const optimizeResumeHandler = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ message: 'Resume not found' });
  }

  const { targetJobTitle, jobDescription } = req.body;
  const result = await optimizeResume({
    targetJobTitle,
    jobDescription,
  });

  resume.optimizedContent = result.content;
  resume.atsScore = result.atsScore;
  resume.targetJobTitle = targetJobTitle;
  await resume.save();

  res.json(resume);
};

export const generateCoverLetterHandler = async (req, res) => {
  const { jobTitle, company, jobDescription } = req.body;
  const letter = await generateCoverLetter({
    userName: req.user.name,
    skills: req.user.skills,
    jobTitle,
    company,
    jobDescription,
  });
  res.json({ coverLetter: letter });
};
