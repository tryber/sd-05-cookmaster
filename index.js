const express = require('express');
const bodyParser = require('body-parser');
const { error } = require('./middlewares');
const { usersController } = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/users', usersController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(error);

app.listen(PORT, () => { console.log(`Online on ${PORT}`); });
