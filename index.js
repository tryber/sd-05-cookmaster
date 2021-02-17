const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/UserController');

const erros = require('./middleware/error');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', userController);

app.use(erros);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Agora diga meu nome.Você é Heisenberg.${PORT}`);
});
