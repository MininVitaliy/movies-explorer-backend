const express = require('express');
const { auth } = require('../middlewares/auth');
const routerUser = require('./user');
const routerMovies = require('./movie');
const {
  login,
  createUser,
} = require('../controllers/user');
const NotFoundError = require('../errors/ErrorNotFound');
const { validateRoutesIn, validateRoutesUp } = require('../validation');

const app = express();

app.post('/signin', validateRoutesIn, login);
app.post('/signup', validateRoutesUp, createUser);
app.use('/users', auth, routerUser);
app.use('/movies', auth, routerMovies);
app.use('*', (req, res, next) => next(new NotFoundError('Нет такой стараницы приложения')));

module.exports = app;
