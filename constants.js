const rateLimit = require('express-rate-limit');

const SUCCESS = 200;
const CREATED = 201;
const ERROR_CODE = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const ERROR_NOT_FOUND = 404;
const CONFLICT_ERROR = 409;
const ERROR_SERVER = 500;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  SUCCESS,
  CREATED,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR,
  limiter,
};
