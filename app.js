require('dotenv').config();
const allowedCors = require('./middlewares/cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('./middlewares/rateLimit');
const cors = require("cors");

const { PORT = 3000, MONGO_DATABASE = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

app.use(helmet());

mongoose.connect(MONGO_DATABASE);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(rateLimit);

app.use(cors(allowedCors));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
