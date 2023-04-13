const mongoose = require('mongoose');
const { validationUrl } = require('../utils/validation');
const {
  URL_INCORRECT,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (url) => validationUrl.test(url),
      message: URL_INCORRECT,
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (url) => validationUrl.test(url),
      message: URL_INCORRECT,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (url) => validationUrl.test(url),
      message: URL_INCORRECT,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    // validate:
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
