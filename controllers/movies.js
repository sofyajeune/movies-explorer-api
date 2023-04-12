const Movies = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const OwnerError = require('../errors/OwnerError');

const {  FILMS_INCORRECT_DATA, FILMS_NOT_FOUND, FILMS_DELETE, FILMS_ID_INCORRECT } = require('../utils/constants');

// router.get('/movies', getMovies)
exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => res.status(200).send({ data: movies }))
    .catch((err) => next(err));
};

// router.post('/movies', createMovie)
exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    railerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN } = req.body;

  const owner = req.user._id;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    railerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(FILMS_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

// router.delete('/movies/:id', deleteMovie);
exports.deleteMovies = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(FILMS_NOT_FOUND);
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movies.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new OwnerError(FILMS_DELETE);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError(FILMS_ID_INCORRECT));
      } else {
        next(err);
      }
    });
};
