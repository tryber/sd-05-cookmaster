const express = require('express');

const bodyParser = require('body-parser');

const usersController = require('./controllers/usersController');

const loginController = require('./controllers/loginController');

const recipesController = require('./controllers/recipesController');

const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', usersController);

app.use('/login', loginController);

app.use('/recipes', authMiddleware, recipesController);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`A Peppa está cozinhando na porta ${PORT}`);
});
