const { SERVER_ERROR, INCORRECT_DATA_ERROR, USER_EXIST_ERROR } = require('../errors/config');
const RESPONSE_MESSAGES = require('../utils/constants');

const {
  cast,
  invalidUpdate,
} = RESPONSE_MESSAGES[400].users;

const {
  duplicateEmail,
} = RESPONSE_MESSAGES[409].users;

const ERROR_TYPES = [
  'RequestError',
  'UnauthorizedError',
  'NotFoundError',
  'UserExistError',
  'ForbiddenError',
];

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(USER_EXIST_ERROR).send({
      message: duplicateEmail,
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(INCORRECT_DATA_ERROR).send({
      message: invalidUpdate,
    });
  }
  if (ERROR_TYPES.includes(err.errorName)) {
    return res.status(err.status).send({ message: err.message });
  }
  if (err.name === 'CastError') {
    return res
      .status(INCORRECT_DATA_ERROR)
      .send({ message: cast });
  }
  return res
    .status(SERVER_ERROR)
    .send({ message: 'Internal Server Error!' });
};
