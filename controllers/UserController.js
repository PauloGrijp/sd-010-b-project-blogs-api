const express = require('express');
const createJWT = require('../middlewares/token/createJWT');
const validateJWT = require('../middlewares/token/validateJWT');
const userValidate = require('../middlewares/userValidate');
const { User } = require('../models');
const UserService = require('../services/UserService');

const UserRouter = express.Router();

UserRouter.post('/', userValidate, createJWT, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { token } = req;

    await User.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

UserRouter.get('/', validateJWT, async (_req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

UserRouter.get('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;

  const user = await UserService.findById(id);

  if (user.isError) {
    return res.status(404).json({ message: user.message });
  }

  return res.status(200).json(user);
});

module.exports = UserRouter;