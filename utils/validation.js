// Регулярные выражения для валидации url и email
const validationEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validationUrl = /^(http|https):\/\/[^"]+\.\w{2,}/;

// Валидация для роутов

const { celebrate, Joi } = require('celebrate');

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(validationEmail),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().min().required().pattern(validationUrl),
    trailerLink: Joi.string().min().required().pattern(validationUrl),
    thumbnail: Joi.string().min().required().pattern(validationUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validationUrl,
  validationEmail,
  updateProfileValidation,
  createMovieValidation,
  deleteMovieValidation,
  signupValidation,
  signinValidation,
};
