const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regex = require('../utils/constants');

const {
  getFilms,
  createFilm,
  deleteFilm,
} = require('../controllers/movie');

router.get('/', getFilms);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regex),
  }),
}), createFilm);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteFilm);

module.exports = router;
