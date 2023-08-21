const { SERVER_ERROR, INCORRECT_DATA_ERROR, USER_EXIST_ERROR } = require('../errors/config');

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
      message: 'A user with this email already exists',
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(INCORRECT_DATA_ERROR).send({
      message: 'Invalid data passed in the request!',
    });
  }
  if (ERROR_TYPES.includes(err.errorName)) {
    return res.status(err.status).send({ message: err.message });
  }
  if (err.name === 'CastError') {
    return res
      .status(INCORRECT_DATA_ERROR)
      .send({ message: 'Requested data not found!' });
  }
  return res
    .status(SERVER_ERROR)
    .send({ message: 'Internal Server Error!' });
};
