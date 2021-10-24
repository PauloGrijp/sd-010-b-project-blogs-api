const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/user');
const loginRouter = require('./router/login');
const categoriesRouter = require('./router/categories');
const postRouter = require('./router/post');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);
app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
