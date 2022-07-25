const router = require('express').Router();
const { filmCreateValidator, filmDeleteValidator } = require('../middlewares/validator');
const { getFilms, createFilm, deleteFilm } = require('../controllers/movie');

router.get('/', getFilms);

router.post('/', filmCreateValidator, createFilm);

router.delete('/:movieId', filmDeleteValidator, deleteFilm);

module.exports = router;
