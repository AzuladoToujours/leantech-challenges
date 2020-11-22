const path = require('path');

module.exports = {
  PORT: process.env.PORT || 4000,
  DB_PATH: path.join(__dirname + '/../src/_data/db.json'),
};
