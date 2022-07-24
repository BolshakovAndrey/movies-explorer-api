const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const moviesRouter = require('./movie');
const authRouter = require('./authentication');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND } = require('../utils/constants');

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.use(authRouter);
router.use(auth, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
});

module.exports = router;
