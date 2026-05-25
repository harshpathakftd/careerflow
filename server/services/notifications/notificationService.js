/**
 * Notification service — email, push, in-app.
 * Extend with Nodemailer, SNS, etc.
 */

export const notifyApplicationStatus = async ({ userId, status, jobTitle }) => {
  console.log(`[Notification] User ${userId}: application ${status} — ${jobTitle}`);
  return { sent: true, channel: 'console' };
};

export const notifyJobMatch = async ({ userId, jobTitle, matchScore }) => {
  console.log(`[Notification] User ${userId}: new match ${jobTitle} (${matchScore}%)`);
  return { sent: true, channel: 'console' };
};
