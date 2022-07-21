const router = require('express').Router();
const auth = require('../middlewares/auth');
const { filmCreateValidator, filmDeleteValidator } = require('../middlewares/validator')
const { getFilms, createFilm, deleteFilm } = require('../controllers/movie');

router.get('/',  getFilms);

router.post('/', auth,  filmCreateValidator, createFilm);

router.delete('/:movieId', auth, filmDeleteValidator, deleteFilm);

module.exports = router;
