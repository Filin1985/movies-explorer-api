const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../errors/NotFoundError');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const SALT = 10;

module.exports.createNewUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT);
    const newUser = await User.create({
      ...req.body, password: hashedPassword,
    });
    res.status(201).send({ newUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const userForUpdate = await User.findById({ _id: owner });
    if (!userForUpdate) {
      throw new NotFoundError('This user does not exist!', 'NotFoundError');
    }
    const updatedUser = await User.findByIdAndUpdate(
      owner,
      { ...req.body },
      { new: true, runValidators: true },
    );
    res.send({ updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const user = await User.findById({ _id: ownerId });
    if (!user) {
      throw new NotFoundError('This id does not exist!', 'NotFoundError');
    }
    res.send({ user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', 'none', {
    maxAge: 10000,
    httpOnly: true,
    sameSite: true,
  });
  res.send({ message: 'You are logout!' });
};
