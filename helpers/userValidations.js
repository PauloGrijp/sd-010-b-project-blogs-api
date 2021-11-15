const displayNameValidate = (displayName) => {
  if (displayName.length < 8) {
    return { isError: true, message: '"displayName" length must be at least 8 characters long' };
  }
  return { isError: false, message: 'ok' };
};

const emailValidate = (email) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  
  if (!email) {
    return { isError: true, message: '"email" is required' };
  }

  if (!regexEmail.test(email)) {
    return { isError: true, message: '"email" must be a valid email' };
  }

  return { isError: false, message: 'ok' };
};

const passwordValidate = (password) => {
  if (!password) {
    return { isError: true, message: '"password" is required' };
  }

  if (password.length < 6) {
    return { isError: true, message: '"password" length must be 6 characters long' };
  }
  
  return { isError: false, message: 'ok' };
};

module.exports = {
  displayNameValidate,
  emailValidate,
  passwordValidate,
};