const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { userRoutes, recipeRoutes, loginRoutes } = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/login', loginRoutes);
app.use('/images', recipeRoutes, express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('app running on port 3000'));
