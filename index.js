const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controller/UserController');
const loginsController = require('./controller/loginController');
const recipesController = require('./controller/recipeController');

const erros = require('./middleware/error');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', usersController);
app.use('/login', loginsController);
app.use('/recipes', recipesController);

app.use(erros);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Agora diga meu nome.Você é Heisenberg.${PORT}`);
});
