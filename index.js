const express = require('express');
const { error } = require('./middlewares');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Online on ${PORT}`); });
