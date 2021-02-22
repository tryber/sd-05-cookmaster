const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const recipeRouter = require('./controllers/recipes');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);
app.use('/images', express.static(path.join(__dirname, '.', 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, console.log('proto'));
