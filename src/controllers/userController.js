const service = require('../services/userService');
const { code: { HTTP_INTERNAL_SERVER_ERROR } } = require('../schema/index');

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const { code, notification } = await service.registerUser(user);

    return res.status(code).json(notification);
  } catch (e) {
    console.log(e);
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
  }
};

const logInUser = async (req, res) => {
  try {
    const userInfo = req.body;
    const { code, notification } = await service.loginUser(userInfo);

    return res.status(code).json(notification);
  } catch (e) {
    console.log(e);
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
  }
};

const getUser = async (_req, res) => {
  try {
    const { code, notification } = await service.getUser();

    return res.status(code).json(notification);
  } catch (e) {
    console.log(e);
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
  }
};

module.exports = {
  registerUser,
  logInUser,
  getUser,
};
