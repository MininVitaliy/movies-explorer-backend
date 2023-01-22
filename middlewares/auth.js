const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const secretKey = 'e48c8af56d8193adabd0723df4fddfdbebbd92d7420b14b5107b6731f211946a';

function createToken(payload) {
  return jwt.sign(
    payload,
    secretKey,
    { expiresIn: '7d' },
  );
}

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
  createToken,
};
