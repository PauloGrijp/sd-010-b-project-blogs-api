const rescue = require('express-rescue');
const controller = require('../controllers/user');
const { authentication } = require('../middlewares/authentication');

function user(app) {
  app.route('/user')
    .post(rescue(controller.newUser));
  app.route('/user/:id')
    .get(rescue(authentication), rescue(controller.getUserById));
  app.route('/user')
    .get(rescue(controller.getUsers));
}

module.exports = user;
