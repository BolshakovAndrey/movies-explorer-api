const router = require('express').Router();
const { updateProfileValidator } = require('../middlewares/validator');
const { updateProfile, getUserInfo } = require('../controllers/user');

router.get('/me', getUserInfo);

router.patch('/me', updateProfileValidator, updateProfile);

module.exports = router;
