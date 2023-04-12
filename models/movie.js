const mongoose = require('mongoose');
const { validationUrl } = require('../utils/validation');

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
      message: 'Необходимо ввести корректный URL',
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (url) => validationUrl.test(url),
      message: 'Необходимо ввести корректный URL',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (url) => validationUrl.test(url),
      message: 'Необходимо ввести корректный URL',
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
