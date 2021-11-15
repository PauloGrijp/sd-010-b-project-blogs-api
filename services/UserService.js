const { User } = require('../models');

const userExists = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    return { isError: true, message: 'User already registered' };
  }

  return { isError: false, message: 'ok' };
};

const findById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return { isError: true, message: 'User does not exist' };    
  }

  return user;
};

module.exports = {
  userExists,
  findById,
};