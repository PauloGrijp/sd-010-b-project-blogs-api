const emailValidate = (email) => {
  if (email === '') {
    return { isError: true, message: '"email" is not allowed to be empty' };
  }

  if (!email) {
    return { isError: true, message: '"email" is required' };
  }

  return { isError: false, message: 'ok' };
};

const passwordValidate = (password) => {
  if (password === '') {
    return { isError: true, message: '"password" is not allowed to be empty' };
  }

  if (!password) {
    return { isError: true, message: '"password" is required' };
  }

  return { isError: false, message: 'ok' };
};

module.exports = {
  emailValidate,
  passwordValidate,
};