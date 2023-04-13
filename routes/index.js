const router = require('express').Router();

const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

const { NOTFOUND_ERROR } = require('../utils/constants');

const { signupValidation, signinValidation } = require('../utils/validation');

// создаёт пользователя с переданными в теле
// email, password и name
router.post('/signup', signupValidation, createUser);

// проверяет переданные в теле почту и пароль
// и возвращает JWT
router.post('/signin', signinValidation, login);

router.use(require('../middlewares/auth'));

router.use(require('./users'));
router.use(require('./movies'));

router.use((req, res, next) => next(new NotFoundError(NOTFOUND_ERROR)));

module.exports = router;
