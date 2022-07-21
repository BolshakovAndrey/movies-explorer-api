const router = require('express').Router();

const userRouter = require('./user');
const movieRouter = require('./movie');

module.exports = router.use(
  userRouter,
  movieRouter,
);
