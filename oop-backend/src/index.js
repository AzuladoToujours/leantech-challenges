const colors = require('colors');
const express = require('express');
const server = express();
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { PORT } = require('../config');
const { UserRoutes } = require('./routes/index');
const { NotFoundMiddleware } = require('./middlewares/index');

server.use(cors());
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(morgan('dev'));

server.use('/api', UserRoutes);
server.get('*', function (req, res) {
  let notFound = new NotFoundMiddleware();
  return notFound.errorResponse(res);
});

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
