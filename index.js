const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const { userRouter, loginRouter, recipesRouter } = require('./controllers');

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('Hello chef');
});
// inicio do projeto

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

app.use('/images', express.static(path.join(__dirname, '.', 'uploads')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Getting ontrack on port ${PORT}`);
});
