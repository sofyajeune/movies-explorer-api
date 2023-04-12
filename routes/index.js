const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login, createUser } = require('../controllers/users');

// проверяет переданные в теле почту и пароль
// и возвращает JWT
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

// создаёт пользователя с переданными в теле
// email, password и name
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createUser);

router.use(require('../middlewares/auth'));

router.use(require('./users'));
router.use(require('./movies'));

router.use((req, res, next) => next(new NotFoundError('Ошибка 404. Страница не найдена!')));

module.exports = router;