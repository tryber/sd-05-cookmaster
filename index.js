const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', routes.UserController);

app.use('/login', routes.LoginController);

app.use('/recipes', routes.RecipesController);

const PORT = process.env.PORT || 3000;

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
