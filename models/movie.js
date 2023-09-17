const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'The field "country" must be filled'],
  },
  director: {
    type: String,
    required: [true, 'The field "director" must be filled'],
  },
  duration: {
    type: Number,
    required: [true, 'The field "duration" must be filled'],
  },
  year: {
    type: String,
    required: [true, 'The field "year" must be filled'],
  },
  description: {
    type: String,
    required: [true, 'The field "description" must be filled'],
  },
  image: {
    type: String,
    required: [true, 'The "image" field must be filled'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Incorrect URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'The "link" field must be filled'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Incorrect URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'The "thumbnail" field must be filled'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Incorrect URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'The "owner" field must be filled'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'The field "movieId" must be filled'],
  },
  nameRU: {
    type: String,
    required: [true, 'The field "nameRU" must be filled'],
  },
  nameEN: {
    type: String,
    required: [true, 'The field "nameEN" must be filled'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
