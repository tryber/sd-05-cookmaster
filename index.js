const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/user');
const userLogin = require('./controllers/login');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', userRouter);

app.use('/login', userLogin);

app.listen(3000, () => console.log('nat na 3000'));
