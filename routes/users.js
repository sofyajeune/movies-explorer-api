const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validationEmail } = require('../utils/validation');

const {
  updateProfile,
  getUser,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(validationEmail),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

module.exports = router;