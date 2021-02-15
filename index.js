const express = require('express');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Online on ${PORT}`); });
