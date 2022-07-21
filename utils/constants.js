// Status codes
const CODE_SUCCESS = 200;// успешно выполнено
const CODE_CREATED = 201; // создано успешно
const CODE_BAD_REQUEST = 400; // переданы некорректные данные
const CODE_UNAUTHORIZED = 401; // ошибка авторизации
const CODE_FORBIDDEN = 403; // доступ запрещен
const CODE_NOT_FOUND = 404; // фильм или пользователь не найдены.
const CODE_CONFLICT = 409; // ошибка регистрации по существующему аккаунту
const CODE_DEFAULT = 500; // ошибка сервера по-умолчанию.
const CODE_MONGO_ERROR = 11000; // попытке создать дубликат уникального поля.

// Errors messages
const SUCCESS = 'Успешно';
const BAD_REQUEST_FILM = 'Передан некорректный id фильма';
const BAD_REQUEST_USER = 'Передан некорректный id пользователя';
const UNAUTHORIZED = 'Передан неверный логин или пароль';
const FORBIDDEN = 'Нет доступа к удалению этого фильма';
const CRASH_TEST = 'Сервер сейчас упадёт';
const DEFAULT = 'На сервере произошла ошибка';
const NOT_FOUND = 'Страница с указанным id не найдена';
const NOT_FOUND_FILM = 'Фильм с указанным id не найден';
const NOT_FOUND_IMAGE = 'Постер с указанным id не найден';
const NOT_FOUND_USER = 'Пользователь с указанным id не найден';
const CONFLICT = 'При регистрации указан email, который уже существует на сервере';
const AUTHORIZE = 'Требуется авторизация';

function validationErrorText(errObject) {
  return `Допущена ошибка: ${errObject}`;
}

module.exports = {
  CODE_SUCCESS,
  CODE_CREATED,
  CODE_BAD_REQUEST,
  CODE_UNAUTHORIZED,
  CODE_FORBIDDEN,
  CODE_NOT_FOUND,
  CODE_CONFLICT,
  CODE_DEFAULT,
  CODE_MONGO_ERROR,
  SUCCESS,
  BAD_REQUEST_FILM,
  BAD_REQUEST_USER,
  UNAUTHORIZED,
  FORBIDDEN,
  CRASH_TEST,
  DEFAULT,
  NOT_FOUND,
  NOT_FOUND_FILM,
  NOT_FOUND_IMAGE,
  NOT_FOUND_USER,
  CONFLICT,
  AUTHORIZE,
  validationErrorText,
};
