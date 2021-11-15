const { emailValidate, passwordValidate } = require('../helpers/loginValidations');
const LoginService = require('../services/LoginService');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  const emailError = emailValidate(email);
  const passwordError = passwordValidate(password);

  if (emailError.isError) {
    return res.status(400).json({ message: emailError.message });
  }
  
  if (passwordError.isError) {
    return res.status(400).json({ message: passwordError.message });
  }

  const userAlreadyExistsError = await LoginService.userExists(email);

  if (userAlreadyExistsError.isError) {
    return res.status(400).json({ message: userAlreadyExistsError.message });
  }  

  next();
};
