const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const { UnauthorizedError } = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Minimum field length "name" - 2'],
    maxlength: [30, 'Maximum field length "name" - 30'],
  },
  email: {
    type: String,
    required: [true, 'The field "email" must be filled'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Incorrect Email',
    },
    index: { unique: true, dropDups: true },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'The field "password" must be filled'],
  },
}, { versionKey: false, toObject: { useProjection: true }, toJSON: { useProjection: true } });

// eslint-disable-next-line func-names, no-unused-vars
userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError('Wrong email or password', 'UnauthorizedError');
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new UnauthorizedError('Wrong email or password', 'UnauthorizedError');
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
