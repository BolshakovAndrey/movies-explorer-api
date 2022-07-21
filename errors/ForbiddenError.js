const { CODE_FORBIDDEN } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
