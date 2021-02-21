const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const recipesRouter = require('./controllers/recipes');

const app = express();

app.use(bodyparser.json());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, console.log('Aqui é team J.B.'));
