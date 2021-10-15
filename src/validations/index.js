const errors = {
  invalidDisplayName: {
    message: '"displayName" length must be at least 8 characters long',
    code: 400,
  },

  invalidEmail: {
      invalidField: {
        message: '"email" is required',
        code: 400,
      },
      invalidFormat: {
        message: '"email" must be a valid email',
        code: 400,
      },
      repeatedEmail: {
        message: 'User already registered',
        code: 409,
      },
  },

  invalidPassword: {
    invalidField: {
      message: '"password" is required',
      code: 400,
    },
    invalidFormat: {
      message: '"password" length must be 6 characters long',
      code: 400,
    },
  },
};
 
const emailValid = (value, emailExist) => {
  if (!value) {
    return errors.invalidEmail.invalidField;
  }

  if (emailExist !== null) {
    return errors.invalidEmail.repeatedEmail;
  }

  const regex = /^([\w\\-]+\.)*[\w\\-]+@([\w\\-]+\.)+([\w\\-]{2,3})$/i;

  if (!regex.test(value)) {
    return errors.invalidEmail.invalidFormat;
  }

  return false;
}; 
 
const displayNameValid = (value) => {
  if (value.length < 8) {
    return errors.invalidDisplayName;
  }

  return false;
};
 
const passwordValid = (value) => {
  if (!value) {
  return errors.invalidPassword.invalidField;
  }

  if (value.length < 6) {
  return errors.invalidPassword.invalidFormat;
  }

  return false;
};
 
module.exports = { 
  emailValid,
  displayNameValid,
  passwordValid,
};