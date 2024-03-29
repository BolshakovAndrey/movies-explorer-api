const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const { signinValidator, signupValidator } = require('../middlewares/validator');

router.post('/signin', signinValidator, login);

router.post('/signup', signupValidator, createUser);

module.exports = router;
