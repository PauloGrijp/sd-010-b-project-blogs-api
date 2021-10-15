const jwt = require('jsonwebtoken');
const { validateCreate } = require('../services/userService');

const secret = 'seusecretdetoken';

const userCreate = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await validateCreate({ displayName, email, password, image });
  const { code, message } = create;
  if (message) {
    res.status(code).json({ message });
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: create }, secret, jwtConfig);
  res.status(201).json({ token });
};

module.exports = {
  userCreate,
};