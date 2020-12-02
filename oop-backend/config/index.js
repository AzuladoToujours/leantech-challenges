const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/.env' });
}

module.exports = {
  DB: require('./db'),
  PORT: process.env.PORT || 4000,
  DB_PATH: path.join(__dirname + '/../src/_data/db.json'),
  MONGO_URI: process.env.MONGO_URI,
};
