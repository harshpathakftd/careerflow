import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { applicationQueue } from '../queues/applicationQueue.js';

export const getApplications = async (req, res) => {
  const applications = await Application.find({ user: req.user._id })
    .populate('job')
    .sort({ updatedAt: -1 });
  res.json(applications);
};

export const applyToJob = async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  let application = await Application.findOne({ user: req.user._id, job: job._id });

  if (application?.status === 'applied') {
    return res.status(400).json({ message: 'Already applied to this job' });
  }

  if (!application) {
    application = await Application.create({
      user: req.user._id,
      job: job._id,
      status: 'pending',
    });
  }

  await applicationQueue.add('auto-apply', {
    applicationId: application._id.toString(),
    userId: req.user._id.toString(),
    jobUrl: job.url,
  });

  res.status(202).json({
    message: 'Application queued',
    application,
  });
};

export const updateApplicationStatus = async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  application.status = req.body.status || application.status;
  application.notes = req.body.notes ?? application.notes;
  await application.save();

  res.json(application);
};
