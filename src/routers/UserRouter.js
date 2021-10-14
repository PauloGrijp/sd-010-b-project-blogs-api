const express = require('express');
const UserController = require('../controllers/userController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/user', validateJWT, UserController.getUsers);

router.post('/user', UserController.createUser);
router.post('/login', UserController.login);

module.exports = router;