const { CODE_DEFAULT } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = CODE_DEFAULT, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === CODE_DEFAULT
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};
