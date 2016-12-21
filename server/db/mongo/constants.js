export const db = process.env.MONGO_URI ||
  // 'mongodb://alberto:123qweasdzxc@aws-eu-west-1-portal.4.dblayer.com:10204/bfo-production?ssl=true'
  'mongodb://alberto:123qweasdzxc@aws-eu-west-1-portal.4.dblayer.com:10204/bfo-dev?ssl=true'
  // 'mongodb://alberto:123qweasdzxc@aws-eu-west-1-portal.4.dblayer.com:10204/bf-passport-dev?ssl=true'

export default {
  db
};
