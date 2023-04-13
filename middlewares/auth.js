const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../config');
const AuthorizedError = require('../errors/AuthorizedError');
const {
  AUTHORIZED_AUTH,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizedError(AUTHORIZED_AUTH));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev');
  } catch (err) {
    return next(new AuthorizedError(AUTHORIZED_AUTH));
  }

  req.user = payload;

  return next();
};
