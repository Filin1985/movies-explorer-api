require('dotenv').config();
const { celebrate, Joi } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { login, createNewUser, logout } = require('./controllers/users');
const { NotFoundError } = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/moviedb' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => console.log('CONNECTION OPEN'))
  .catch((error) => console.log(error));

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(cors);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createNewUser);

app.post('/signout', logout);

app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('Page does not exist!', 'NotFoundError'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server are running!');
});
