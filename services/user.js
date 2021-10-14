require('dotenv').config();

const jwt = require('jsonwebtoken');

const { 
  checkEmail,
  checkName,
  checkPassword,
  emailAlreadyExists,
 } = require('../middlewares/user');

const { User } = require('../models');

const authenticationToken = (user) => {
  const { id, displayName, image, email } = user;
  const newToken = jwt.sign(
    {
      id,
      displayName,
      image,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  );
  return newToken;
};

const validToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'token not found' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'invalid token' });
  }
};

const createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  const newToken = authenticationToken(newUser);

  return res.status(201).json({ token: newToken });
};

// verify

const verifyEmail = (req, res, next) => {
  const emailIsValid = checkEmail({ email: req.body.email });
  if (emailIsValid.message !== 'ok') return res.status(400).json(emailIsValid);
  next();
};

const verifyName = (req, res, next) => {
  const nameIsValid = checkName({ displayName: req.body.displayName });
  if (nameIsValid.message !== 'ok') return res.status(400).json(nameIsValid);
  next();
};

const verifyPassword = (req, res, next) => {
  const passwordIsValid = checkPassword({ password: req.body.password });
  if (passwordIsValid.message !== 'ok') return res.status(400).json(passwordIsValid);
  next();
};

const verifyImage = (req, res, next) => {
  const { image } = req.body.image;
  if (!image) return res.status(400).json({ message: '"image" is required' });
  next();
};

const userAlreadyExists = async (req, res, next) => {
  const userIsValid = await emailAlreadyExists({ email: req.body.email });
  if (userIsValid.message !== 'ok') return res.status(409).json(userIsValid);
  next();
};

module.exports = {
  createUser,
  validToken,
  verifyEmail,
  verifyName,
  verifyPassword,
  verifyImage,
  userAlreadyExists,
};