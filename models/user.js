const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { UNAUTHORIZED } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email  должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Некорректный адрес почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле пароль должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле имя должно быть заполнено'],
    minLength: [2, 'Минимальное количество букв в имени - 2'],
    maxLength: [30, 'Минимальное количество букв в имени - 30'],
    default: 'Тестовый пользователь',
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(UNAUTHORIZED));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(UNAUTHORIZED));
          }
          return user;
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
