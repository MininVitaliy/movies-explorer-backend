const { ERROR_CODE } = require('../constants');

class ErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

module.exports = ErrorCode;
