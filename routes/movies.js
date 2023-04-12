const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validationUrl } = require('../utils/validation');

const { getMovies, createMovie, deleteMovies } = require('../controllers/movies'); //экспорт контроллеров

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().min(2).required()
    .pattern(validationUrl),
    trailerLink: Joi.string().min(2).required()
    .pattern(validationUrl),
    thumbnail: Joi.string().min(2).required()
    .pattern(validationUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deleteMovies);

module.exports = router;

