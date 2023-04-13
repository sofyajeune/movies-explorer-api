const router = require('express').Router();

const { getMovies, createMovie, deleteMovies } = require('../controllers/movies');
// экспорт контроллеров

const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм с переданными в теле country, director, duration,
// year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/movies', createMovieValidation, createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', deleteMovieValidation, deleteMovies);

module.exports = router;
