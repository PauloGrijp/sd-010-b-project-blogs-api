const express = require('express');
const loginValidate = require('../middlewares/loginValidate');
const createJWT = require('../middlewares/token/createJWT');

const LoginRouter = express.Router();

LoginRouter.post('/', createJWT, loginValidate, (req, res) => {
  try {
    const { token } = req;

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = LoginRouter;
