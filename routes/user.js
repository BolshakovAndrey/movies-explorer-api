const router = require('express').Router();
const { userPatchValidator } = require('../middlewares/validator');
const { updateProfile, getUserInfo } = require('../controllers/user');

router.get('/me', getUserInfo);

router.patch('/me', userPatchValidator, updateProfile);

module.exports = router;
