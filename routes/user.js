const express = require('express');

const router = express.Router();

const middleware = require('../middlewares/user');
const controller = require('../controllers/users');

const token = require('../middlewares/token');

router.route('/')
    .get(
        token.haveToken,
        token.validToken,
        controller.getAll,
    )
    .post(
        middleware.displayNameVerify,
        middleware.existEmail,
        middleware.Email,
        middleware.Password,
        middleware.passwordLen,
        middleware.uniqueEmail,
        controller.create,
    );

router.route('/:id')
    .get(
        token.haveToken,
        token.validToken,
        controller.getUser,
    );

    router.route('/user/me')
    .delete();

module.exports = router;