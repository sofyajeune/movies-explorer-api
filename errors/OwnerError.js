const { OWNER_ERROR } = require('../utils/constants');

class OwnerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OwnerError';
    this.statusCode = OWNER_ERROR;
  }
}

module.exports = OwnerError;
