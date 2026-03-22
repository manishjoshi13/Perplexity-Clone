import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config()

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD,
    connectTimeout: 10000,   // increase timeout
  retryStrategy: (times) => Math.min(times * 50, 2000),
})

redisClient.on('connect', () => {
    console.log('Redis Connected')
})
redisClient.on('error', (err) => {
    console.error('Redis Connection Error:', err);
});

export default redisClient;