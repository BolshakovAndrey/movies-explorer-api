const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  validationErrorText,
  CONFLICT,
  CODE_MONGO_ERROR,
  NOT_FOUND_USER,
  UNAUTHORIZED,
} = require('../utils/constants');

function getUserInfo(req, res, next) {
  User.findById(req.user._id)
    .then((userData) => {
      res.send(userData);
    })
    .catch((err) => next(err));
}

function createUser(req, res, next) {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => {
          res.send({
            name,
            email,
            _id: user._id,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            const errObject = Object.keys(err.errors).join(', ');
            next(new BadRequestError(validationErrorText(errObject)));
            return;
          }
          if (err.code === CODE_MONGO_ERROR) {
            next(new ConflictError(CONFLICT));
            return;
          }
          next(err);
        });
    }).catch(next);
}

function updateProfile(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errObject = Object.keys(err.errors).join(', ');
        next(new BadRequestError(validationErrorText(errObject)));
        return;
      }
      if (err.code === CODE_MONGO_ERROR) {
        next(new ConflictError(CONFLICT));
        return;
      }
      next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token })
        .end();
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new UnauthorizedError(UNAUTHORIZED));
        return;
      }
      next(err);
    });
}

module.exports = {
  createUser,
  updateProfile,
  getUserInfo,
  login,
};
