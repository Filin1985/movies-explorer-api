const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const Movie = require('../models/movie');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
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
    const { movieId } = req.params;
    const userId = req.user._id;
    const movie = await Movie.findById({ _id: movieId });
    if (!movie) {
      throw new NotFoundError('This id does not exist!', 'NotFoundError');
    }
    if (userId !== movie.owner.valueOf()) {
      throw new ForbiddenError('You have no right to delete other people`s movies!', 'ForbiddenError');
    }
    await movie.deleteOne();
    res.status(200).send({ movie });
  } catch (err) {
    next(err);
  }
};
