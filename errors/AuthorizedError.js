const { AUTHORIZED_ERROR } = require('../utils/constants');

class AuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizedError';
    this.statusCode = AUTHORIZED_ERROR;
  }
}

module.exports = AuthorizedError;
