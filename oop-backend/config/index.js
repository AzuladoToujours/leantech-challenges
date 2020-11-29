if (process.env.NODE_ENV !== "production") {
  require('dotenv').config({ path: __dirname + '/.env'})
}

module.exports = {
  DB: require('./db'),
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
}; 