const bcrypt = require('bcryptjs');
const { userNew } = require('../models/user');
const { createToken } = require('../middlewares/auth');
const NotFoundError = require('../errors/ErrorNotFound');
const ErrorCode = require('../errors/ErrorCode');
const ConflictError = require('../errors/ConflictError');
const { SUCCESS } = require('../constants');

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userNew.findById(_id);
    if (user === null) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(SUCCESS).json({ user });
  } catch (e) {
    return next(e);
  }
};

const changeUser = async (req, res, next) => {
  try {
    const user = await userNew.findByIdAndUpdate(
      req.user._id,
      {
        email: req.body.email,
        name: req.body.name,
      },
      { new: true, runValidators: true },
    );
    if (user === null) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(SUCCESS).json({ user });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new ErrorCode('Переданы некорректные данные'));
    }
    return next(e);
  }
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userNew.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ErrorCode('Переданы некорректные данные в методы создания пользовтаеля'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Указанный email уже занят'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return userNew.findUserByCredentials(email, password)
    .then((user) => {
      const token = createToken({ _id: user._id });
      res.status(SUCCESS).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUser,
  changeUser,
  createUser,
  login,
};
