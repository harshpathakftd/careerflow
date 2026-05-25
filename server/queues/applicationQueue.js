import { Queue, Worker } from 'bullmq';
import { getRedis } from '../config/redis.js';
import { processAutoApplyJob } from '../jobs/autoApplyJob.js';

const connection = getRedis();

export const applicationQueue = new Queue('application-queue', { connection });

export const startApplicationWorker = () => {
  const worker = new Worker('application-queue', processAutoApplyJob, { connection });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
  });

  return worker;
};

// Start worker when this module loads in dev
if (process.env.NODE_ENV !== 'test') {
  try {
    startApplicationWorker();
    console.log('Application queue worker started');
  } catch (err) {
    console.warn('Queue worker not started (Redis may be offline):', err.message);
  }
}
