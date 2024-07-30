import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mongodb: {
    uri: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
    ssl: process.env.MONGODB_SSL?.toLowerCase() === 'true' ? true : false,
    debug: false,
  },
  redis: {
    host: process.env.REDISDB_HOST,
    port: parseInt(process.env.REDISDB_PORT || '3667'),
    auth: process.env.REDISDB_AUTH !== 'true' ? '' : process.env.REDISDB_PWD,
  },
}));
