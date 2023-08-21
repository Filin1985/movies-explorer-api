const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  updateUserProfile,
  getUserProfile,
} = require('../controllers/users');

router.get('/me', getUserProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

module.exports = router;
