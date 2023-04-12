const DUPLICATE_ERROR = 409;
const AUTHORIZED_ERROR = 401;
const OWNER_ERROR = 403;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const FILMS_INCORRECT_DATA = 'Переданы некорректные данные при создании фильма';
const FILMS_NOT_FOUND = 'Фильм не найден.';
const FILMS_DELETE = 'Вы не можете удалить чужой фильм';
const FILMS_ID_INCORRECT = 'Некорректный id';

const USER_ALREADY_EXISTS = 'Пользователь с такой почтой уже зарегистрирован';
const USER_INCORRECT_DATA = 'Переданы некорректные данные при создании пользователя';
const USER_NOT_FOUND = 'Пользователь с таким именем не существует';

const EMAIL_ERROR = 'Неправильный формат почты';
const EMAILPASSWORD_ERROR = 'Неправильные почта или пароль';
const NOTFOUND_ERROR = 'Ошибка 404. Страница не найдена';

module.exports = {
  DUPLICATE_ERROR,
  AUTHORIZED_ERROR,
  OWNER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  FILMS_INCORRECT_DATA,
  FILMS_NOT_FOUND,
  FILMS_DELETE,
  FILMS_ID_INCORRECT,
  USER_ALREADY_EXISTS,
  USER_INCORRECT_DATA,
  USER_NOT_FOUND,
  EMAIL_ERROR,
  EMAILPASSWORD_ERROR,
  NOTFOUND_ERROR
};
