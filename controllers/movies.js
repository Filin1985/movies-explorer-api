const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const RESPONSE_MESSAGES = require('../utils/constants');

const { invalidAccessRights } = RESPONSE_MESSAGES[403].movies;
const { notFoundUserId, notFoundMovieId } = RESPONSE_MESSAGES[404].movies;

const Movie = require('../models/movie');

module.exports.getMovies = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const movies = await Movie.find({ owner: _id }).populate('owner', '_id');
    if (!movies) {
      throw new NotFoundError(notFoundUserId, 'NotFoundError');
    }
    res.send({ movies });
  } catch (err) {
    next(err);
  }
};

module.exports.createNewMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image, trailerLink, nameRU, nameEN, thumbnail, movieId,
    } = req.body;
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    res.status(201).send({ newMovie });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const { id: movieId } = req.params;
    const userId = req.user._id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError(notFoundMovieId, 'NotFoundError');
    }
    if (userId !== movie.owner.valueOf()) {
      throw new ForbiddenError(invalidAccessRights, 'ForbiddenError');
    }
    await movie.deleteOne();
    res.status(200).send({ movie });
  } catch (err) {
    next(err);
  }
};
