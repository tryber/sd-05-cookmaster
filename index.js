const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const {
  usersController,
  loginController,
  recipesController,
} = require('./controllers/index');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', usersController);

app.use('/login', loginController);

app.use('/recipes', recipesController);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`tá rolando na porta ${port}`));
