import Redis from 'ioredis';

let redisClient = null;

export const getRedis = () => {
  if (!redisClient) {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      maxRetriesPerRequest: null,
    });
  }
  return redisClient;
};

export default getRedis;
