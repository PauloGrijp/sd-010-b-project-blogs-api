const express = require('express');
const { create, getAllCategories } = require('../../controllers/categoriesController');

 const validateToken = require('../../middlewares/validateToken');

 const { validateName } = require('../../middlewares/categoriesMiddleware');

const router = express.Router();

router.post('/',
  validateToken,
  validateName, 
  create);

router.get('/',
  validateToken,
  getAllCategories);

module.exports = router;