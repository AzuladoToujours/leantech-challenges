const colors = require('colors');
const express = require('express');
const server = express();

const { PORT } = require('../config');

// Import your Routes
// const { } = require('./routes');

// Import your middleware
// const { } = require('./middlewares');

// Don't forget to use a body-parser, express has its own.
// server.use();

// Create your routes and use them
// server.use();

// Use your middleware
// server.use();

server.listen(PORT, () => {
  console.log(`Application running on PORT ${PORT} ^_^`.yellow.bold);
});
