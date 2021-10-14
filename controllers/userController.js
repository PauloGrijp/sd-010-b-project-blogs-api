const { createUser, isValidLogin } = require('../services/userService');
const { Users } = require('../models');
const { token } = require('../auth/token');

const user = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await createUser(displayName, email, password, image);

  if (create.error) return res.status(400).json({ message: create.err.message });
  if (create.error2) return res.status(409).json({ message: 'User already registered' });

  const newToken = await token(req.body);
  return res.status(201).json({ token: newToken });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const isValid = isValidLogin(email, password);
  console.log(isValid);
  if (isValid) return res.status(400).json({ message: isValid.message });

  const users = await Users.findOne({ where: { email, password } });
  console.log('user', users);
  if (!users) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const newToken = token(users);
  return res.status(200).json({ token: newToken });
};

module.exports = {
  user,
  login,
}; 