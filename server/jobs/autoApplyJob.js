import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { runAutoApply } from '../services/automation/playwrightService.js';
import { notifyApplicationStatus } from '../services/notifications/notificationService.js';

export const processAutoApplyJob = async (job) => {
  const { applicationId, userId, jobUrl } = job.data;

  const application = await Application.findById(applicationId).populate('job');
  if (!application) {
    throw new Error('Application not found');
  }

  const result = await runAutoApply({ jobUrl, userId });

  application.automationLog = result.log;
  if (result.success) {
    application.status = 'applied';
    application.appliedAt = new Date();
  }
  await application.save();

  const jobDoc = await Job.findById(application.job);
  await notifyApplicationStatus({
    userId,
    status: application.status,
    jobTitle: jobDoc?.title,
  });

  return result;
};
