const { User: UserModel } = require('../models');
const validations = require('../util/validations');
const removeUserPass = require('../util/removeUserPass');

const createUser = async ({ displayName, email, password, image }) => {
  await validations.verifyCreateUserData(displayName, email, password);

  const user = await UserModel.create({ displayName, email, password, image });
  const userWithoutPass = removeUserPass(user);

  return userWithoutPass;
};

const login = async ({ email, password }) => {
  await validations.verifyLoginData(email, password);

  const user = await UserModel.findOne({ where: { email } });
  const userWithoutPass = removeUserPass(user);

  return userWithoutPass;
};

const getUsers = async () => {
  const users = await UserModel.findAll();

  const usersWithoutPass = users.map((user) => removeUserPass(user));

  return usersWithoutPass;
};

module.exports = {
  createUser,
  getUsers,
  login,
};
