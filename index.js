const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rota = require('./controller/UserController');
const login = require('./controller/loginController');
const recipeRouter = require('./controller/recipeController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', rota);
app.use('/login', login);
app.use('/recipes', recipeRouter);
app.use('/images', express.static(path.join(__dirname, 'uploads')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Agora diga meu nome.Você é Heisenberg.${PORT}`);
});
