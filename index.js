const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controller/userController');
const loginController = require('./controller/loginController');
const recipeController = require('./controller/recipeController');

const app = express();

// app.use(express.json());
app.use(bodyParser.json());

app.use('/users', userController);

app.use('/login', loginController);

app.use('/recipes', recipeController); // algo aqui deu ruim

app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
