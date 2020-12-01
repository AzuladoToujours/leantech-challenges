const express = require('express');
const server = express();
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index');
const {
  NotFoundMiddleware,
  ErrorHandlerMiddleware,
} = require('./middlewares/index');
const { PORT, DB } = require('../config');
const ErrorHandler = require('./middlewares/error-handler.middleware');

server.use(cors());
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(morgan('dev'));

server.use('/api', router);
server.get('*', function (req, res) {
  let notFound = new NotFoundMiddleware();
  return notFound.errorResponse(res);
});
server.use(function (err, req, res, next) {
  let errorHandler = new ErrorHandlerMiddleware();
  return errorHandler.errorResponse(res);
});

// Init Mongo Connection
DB();

server.listen(PORT, () => {
  console.log(`Application running on PORT ${PORT} ^_^`);
});
