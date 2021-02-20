const express = require('express');
const bodyparser = require('body-parser');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

app.use(bodyparser.json());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, console.log('Aqui é team J.B.'));
