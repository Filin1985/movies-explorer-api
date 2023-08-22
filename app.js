require('dotenv').config();
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
const { signupUserValidation, signinUserValidation } = require('./utils/validation');

const { MONGODB_URL } = require('./utils/config');

const { PORT } = process.env;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => console.log('CONNECTION OPEN'))
  .catch((error) => console.log(error));

const app = express();

app.use(helmet());
app.use(limiter);
app.use(cors);

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

app.post('/signin', signinUserValidation, login);

app.post('/signup', signupUserValidation, createNewUser);

app.use(auth);

app.post('/signout', logout);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('Page does not exist!', 'NotFoundError'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server are running!');
});
