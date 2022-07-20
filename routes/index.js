const router = require('express').Router();

const userRouter = require('./user');
const cardRouter = require('./movie');

module.exports = router.use(
  userRouter,
  cardRouter,
);
