const { movieNew } = require('../models/movie');
const ErrorCode = require('../errors/ErrorCode');
const NotFoundError = require('../errors/ErrorNotFound');
const ForbiddenError = require('../errors/ForbiddenError');
const { SUCCESS, CREATED } = require('../constants');

const getMovie = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const movies = await movieNew.find({owner: _id}).populate(['owner']);
    return res.status(SUCCESS).json(movies);
  } catch (e) {
    return next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movieUpdate = await movieNew.create({
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailerLink: req.body.trailerLink,
      thumbnail: req.body.thumbnail,
      owner: req.user._id,
      movieId: req.body.id,
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
    });
    return res.status(CREATED).json(movieUpdate);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new ErrorCode('Переданы некорректные данные в методы создания карточки'));
    }
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movieInfo = await movieNew.findById(movieId);
    if (movieInfo === null) {
      return next(new NotFoundError('Карточка не найдена'));
    }
    if (movieInfo.owner.toString() === req.user._id) {
      await movieNew.findByIdAndRemove(movieId);
      return res.status(SUCCESS).json({ message: 'Карточка удалена' });
    }
    return next(new ForbiddenError('Карточку нельзя удалять данным пользователем'));
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new ErrorCode('Переданы некорректные данные iD'));
    }
    return next(e);
  }
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
