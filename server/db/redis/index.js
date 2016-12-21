import redis from 'redis'

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
const client = redis.createClient(6379, REDIS_HOST)

client.on('connect', function() {
    console.log('connected to Redis');
});

export default client
