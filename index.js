const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => { response.send(); });
app.use('/users', userController);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
