const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 160,
  windowMS: 55000,
  message: 'The number of requests has been exceeded. Please try again later.',
});

module.exports = limiter;
