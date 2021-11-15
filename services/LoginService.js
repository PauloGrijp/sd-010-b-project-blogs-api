const { User } = require('../models');

const userExists = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { isError: true, message: 'Invalid fields' };
  }

  return { isError: false, message: 'ok' };
};

module.exports = {
  userExists,
};