const {
  INTERNAL_SERVER_ERROR, SERVER_ERR,
} = require('../utils/constants');

const handleErrors = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERR });
  }
  next();
};

module.exports = handleErrors;
