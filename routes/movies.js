const router = require('express').Router();
const {
  getMovies,
  deleteMovie,
  createNewMovie,
} = require('../controllers/movies');
const {
  createNewMovieValidation,
  deleteMovieValidation,
} = require('../utils/validation');

router.get('/', getMovies);
router.post('/', createNewMovieValidation, createNewMovie);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
