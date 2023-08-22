/* eslint-disable camelcase */
const { celebrate, Joi } = require('celebrate');

const URl_VALIDATOR_REG_EXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const EMAIL_REG_EXP = /.+@.+\..+/;

const signupUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signinUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REG_EXP),
    name: Joi.string().required().min(2).max(30),
  }),
});

const createNewMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URl_VALIDATOR_REG_EXP),
    trailerLink: Joi.string().required().pattern(URl_VALIDATOR_REG_EXP),
    thumbnail: Joi.string().required().pattern(URl_VALIDATOR_REG_EXP),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  URl_VALIDATOR_REG_EXP,
  EMAIL_REG_EXP,

  signupUserValidation,
  signinUserValidation,
  updateUserProfileValidation,
  createNewMovieValidation,
  deleteMovieValidation,
};
