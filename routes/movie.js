const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regex = require('../utils/constants');

const {
  getFilms,
  createFilm,
  deleteFilm,
  addLike,
  deleteLike,
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

router.put('/:movieId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), addLike);

router.delete('/:movieId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteLike);

module.exports = router;
