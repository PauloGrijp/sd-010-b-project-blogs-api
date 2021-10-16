const { User } = require('../models');

const emailRegex = /\S+@\S+\.\S+/; 

const checks = {
  name: (name) => name.length < 8,
  email: (email) => (!emailRegex.test(email)),
  password: (password) => password.length < 6,
};

const error = {
  name: { 
    have: { err: 400, message: '"displayName" is required' },
    valid: { err: 400, message: '"displayName" length must be at least 8 characters long' },
  },
  email: {
    have: { err: 400, message: '"email" is required' },
    valid: { err: 400, message: '"email" must be a valid email' },
    exists: { err: 409, message: 'User already registered' },
  },
  password: {
    have: { err: 400, message: '"password" is required' },
    valid: { err: 400, message: '"password" length must be 6 characters long' },
  },
};

const check = (name, string) => {
  switch (true) {
    case !name:
      return error[string].have;
    case checks[string](name):
      return error[string].valid;
    default:
      return false;
  }
};

const checkBody = (req) => {
  const { displayName, email, password } = req.body;
  switch (true) {
    case !!check(displayName, 'name'):
      return check(displayName, 'name');
    case !!check(email, 'email'):
      return check(email, 'email');
    case !!check(password, 'password'):
      return check(password, 'password');
    default:
      return false;
  }
};

const getOne = async (email) => User.findOne({ where: { email } });

const createUsersServices = async (req) => {
  const checksIsOk = checkBody(req);
  if (checksIsOk) {
    return checksIsOk;
  }
  const { displayName, email, password, image } = req.body;
  const checkExists = await getOne(email);
  if (checkExists) {
    return error.email.exists;
  }

  try {
    const user = await User.create({ displayName, email, password, image });
    return (user);
  } catch (err) {
    return (err);
  }
};

module.exports = {
  createUsersServices,
};
