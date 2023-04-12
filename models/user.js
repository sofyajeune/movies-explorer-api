const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { validationEmail } = require('../utils/validation');
const { EMAILPASSWORD_ERROR } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validationEmail.test(email),
      message: 'Необходимо ввести корректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // Защита пароля
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizedError(EMAILPASSWORD_ERROR));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizedError(EMAILPASSWORD_ERROR));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);