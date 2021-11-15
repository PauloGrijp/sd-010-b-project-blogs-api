const UserService = require('../services/UserService');
const {
  displayNameValidate,
  emailValidate,
  passwordValidate,
} = require('../helpers/userValidations');

module.exports = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const displayNameError = displayNameValidate(displayName);
  const emailError = emailValidate(email);
  const passwordError = passwordValidate(password);
  
  if (displayNameError.isError) {
    return res.status(400).json({ message: displayNameError.message });
  }
  
  if (emailError.isError) {
    return res.status(400).json({ message: emailError.message });
  }
  
  if (passwordError.isError) {
    return res.status(400).json({ message: passwordError.message });
  }
  
  const userAlreadyExistsError = await UserService.userExists(email);

  if (userAlreadyExistsError.isError) {
    return res.status(409).json({ message: userAlreadyExistsError.message });
  }  

  next();
};
