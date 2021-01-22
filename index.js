const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', routes.UserController);

app.use('/login', routes.LoginController);

app.use('/recipes', routes.RecipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(handleErrors);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
