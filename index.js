const express = require('express');

const app = express();
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');
const categoryRouter = require('./routers/categoryRouter');

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.use(express.json());
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoryRouter);

app.get('/', (request, response) => {
  response.send();
});
