const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< HEAD

const userController = require('./controller/userController');

const app = express();

// app.use(express.json());
app.use(bodyParser.json());
app.use('/users', userController);

// app.use('/', recipeController);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
=======

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

>>>>>>> rafaelpbar-sd-05-cookmaster
