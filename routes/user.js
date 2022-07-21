const router = require('express').Router();
const auth = require('../middlewares/auth');
const { updateProfileValidator } = require('../middlewares/validator');
const { updateProfile, getUserInfo } = require('../controllers/user');

router.get('/me', auth, getUserInfo);

router.patch('/me', auth, updateProfileValidator, updateProfile);

module.exports = router;
