require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('./middlewares/rateLimit');
const { PORT = 3000, MONGO_DATABASE = 'mongodb://localhost:27017/moviesdb'} = process.env;

const app = express();

app.use(helmet());

mongoose.connect(MONGO_DATABASE);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(rateLimit);

app.use(cors());

app.use(routes);

app.use(auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемой страницы не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
