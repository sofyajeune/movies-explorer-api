const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = require('../config');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const DuplicateError = require('../errors/DuplicateError');

const {
  USER_ALREADY_EXISTS, USER_INCORRECT_DATA, USER_NOT_FOUND, USER_INCORRECT_UPDATE,
} = require('../utils/constants');

// router.get('/users/me', getUser)
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_INCORRECT_UPDATE);
      }
      return res.send({ data: user });
    })
    .catch(next);
};

// router.post('/signup', createUser) (POST http://localhost:3000/signup)
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new DuplicateError(USER_ALREADY_EXISTS));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(USER_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

// router.post('/signin', login)
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

// router.patch('/users/me', updateProfile)
exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(USER_INCORRECT_UPDATE));
      } else if (err.code === 11000) {
        next(new DuplicateError(USER_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};
