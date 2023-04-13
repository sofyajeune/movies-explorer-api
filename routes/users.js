const router = require('express').Router();

const { updateProfile, getUser } = require('../controllers/users');

const { updateProfileValidation } = require('../utils/validation');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = router;
