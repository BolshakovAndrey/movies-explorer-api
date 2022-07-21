const { celebrate, Joi } = require('celebrate');

const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});


module.exports = {
  updateProfileValidator
}
