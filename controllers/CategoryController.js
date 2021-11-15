const express = require('express');
const { Category } = require('../models');
const categoryValidate = require('../middlewares/categoryValidate');
const validateJWT = require('../middlewares/token/validateJWT');

const CategoryRouter = express.Router();

CategoryRouter.post('/', validateJWT, categoryValidate, async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  return res.status(201).json(category);
});

CategoryRouter.get('/', validateJWT, async (_req, res) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = CategoryRouter;