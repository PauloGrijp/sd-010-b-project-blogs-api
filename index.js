const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/CategoriesController');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());
app.listen(3000, () => console.log('ouvindo porta 3000!'));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/user', userController.create);
app.post('/login', userController.login);
app.get('/user', validateJWT, userController.getAllUsers);
app.get('/user/:id', validateJWT, userController.getUserById);
app.post('/categories', validateJWT, categoriesController.createCategories);
app.get('/categories', validateJWT, categoriesController.getAllCategories);