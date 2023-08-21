const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getMovies,
  deleteMovie,
  createNewMovie,
} = require('../controllers/movies');
// eslint-disable-next-line camelcase
const { URl_VALIDATOR_REG_EXP } = require('../config');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .pattern(new RegExp(URl_VALIDATOR_REG_EXP)),
    trailerLink: Joi.string()
      .required()
      .pattern(new RegExp(URl_VALIDATOR_REG_EXP)),
    thumbnail: Joi.string()
      .required()
      .pattern(new RegExp(URl_VALIDATOR_REG_EXP)),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createNewMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
