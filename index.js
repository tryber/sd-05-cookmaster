const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`A Peppa está cozinhando na porta ${PORT}`);
});
