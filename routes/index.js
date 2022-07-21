const router = require('express').Router();

const userRouter = require('./user');
const movieRouter = require('./movie');
const authRouter = require('./authentication');

module.exports = router.use(
  userRouter,
  movieRouter,
  authRouter,
);
