const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const app = express();
app.use(bodyParser.json());
app.use('/users', controllers.users);
app.use('/login', controllers.login);
app.use('/recipes', controllers.recipes);
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, console.log(`Erick Jaquin is listening on :${PORT}`));
