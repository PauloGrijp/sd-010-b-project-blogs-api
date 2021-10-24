const router = require('express').Router();

const UserController = require('../controllers/userController');
const inputValidation = require('../middlewares/createUser');
const { tokenValidator } = require('../middlewares/tokenValidator');

router.post('/', inputValidation, UserController.create);
router.get('/', tokenValidator, UserController.getAll);
router.get('/:id', tokenValidator, UserController.getById);

module.exports = router;