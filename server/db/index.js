import { DB_TYPE } from '../config/appConfig';
import { DB_TYPES } from '../config/constants';
import dbConfig from './mongo'

// let dbConfig = null;
//
// /* use inline requires for conditional loading */
// switch (DB_TYPE) {
//   case DB_TYPES.MONGO:
//     dbConfig = require('./mongo');
//     break;
//   default:
//     throw new Error(`No database type '${DB_TYPE}' found`);
// }
export {default as redisClient} from './redis'
export const connect = dbConfig.connect;
export const controllers = dbConfig.controllers;
export const passport = dbConfig.passport;
export const session = dbConfig.session;

export default dbConfig.default;
