const router = require('express').Router();
const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const { validateMoviePost, validateMovieDelete } = require('../validation');

router.get('/', getMovie);
router.post('/', validateMoviePost, createMovie);
router.delete('/:id', validateMovieDelete, deleteMovie);

module.exports = router;
