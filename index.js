const express = require('express');
const bodyParser = require('body-parser');
const { loginController, recipesController, usersController } = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/login', loginController);
app.use('/recipes', recipesController);
app.use('/users', usersController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

const errorMiddleware = (err, _res, req, _next) => {
  const { status, message } = err;
  req.status(status).json({ message });
};

app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`Online on ${PORT}`); });
