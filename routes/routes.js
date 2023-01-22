const {
  celebrate,
  Joi,
} = require('celebrate');
const validator = require('validator');
const express = require('express');
const { auth } = require('../middlewares/auth');
const routerUser = require('./user');
const routerMovies = require('./movie');
const {
  login,
  createUser,
} = require('../controllers/user');
const NotFoundError = require('../errors/ErrorNotFound');

const app = express();

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Некорректный email');
    }),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Некорректный email');
    }),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
app.use('/users', auth, routerUser);
app.use('/movies', auth, routerMovies);
app.use('*', (req, res, next) => next(new NotFoundError('Нет такой стараницы приложения')));

module.exports = app;
