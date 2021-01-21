const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());

app.use('/users', usersController);

app.use('/recipes', recipesController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
