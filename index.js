const express = require('express');
const LoginRouter = require('./controllers/LoginController');
const UserRouter = require('./controllers/UserController');
const CategoryRouter = require('./controllers/CategoryController');
const BlogPostRouter = require('./controllers/BlogPostController');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/categories', CategoryRouter);
app.use('/post', BlogPostRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));