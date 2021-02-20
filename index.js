const express = require('express');

const bodyParser = require('body-parser');
const { users } = require('./controllers');
const { recipes } = require('./controllers');

const app = express();
app.use(bodyParser.json());

// ------------------------------------------------------------------------------------------------
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ------------------------------------------------------------------------------------------------

// (user) para endpoints users
app.use(users);
// (recipes) para endpoints recipes
app.use(recipes);
// uploads Jacquizinho virado no tumpero
app.use('/images', express.static('uploads'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Escutando porta ${PORT}, Xablau`);
});
