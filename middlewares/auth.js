const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/UnauthorizedError');
const RESPONSE_MESSAGES = require('../utils/constants');

const { invalidAuth } = RESPONSE_MESSAGES[401].users;

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError(invalidAuth, 'UnauthorizedError'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(invalidAuth, 'UnauthorizedError'));
    return;
  }
  req.user = payload;

  next();
};
