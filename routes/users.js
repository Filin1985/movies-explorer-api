const router = require('express').Router();
const {
  updateUserProfile,
  getUserProfile,
} = require('../controllers/users');
const { updateUserProfileValidation } = require('../utils/validation');

router.get('/me', getUserProfile);
router.patch('/me', updateUserProfileValidation, updateUserProfile);

module.exports = router;
