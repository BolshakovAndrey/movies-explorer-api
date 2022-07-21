const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const isUrl = (link) => {
  const result = validator.isURL(link);
  if (result) {
    return link;
  }
  throw new Error('Невалидный URL');
};

const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const filmCreateValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isUrl),
    trailerLink: Joi.string().required().custom(isUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(isUrl),
    movieId: Joi.number().required(),
  }),
});

const filmDeleteValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
    password: Joi.string().required(),
  }),
});

module.exports = {
  updateProfileValidator,
  filmCreateValidator,
  filmDeleteValidator,
  signinValidator,
  signupValidator,
};
