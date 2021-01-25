const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { userRouter } = require('./controllers');

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('Hello chef');
});
// inicio do projeto

app.use('/users', userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Getting ontrack on port ${PORT}`);
});
