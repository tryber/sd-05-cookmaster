const express = require('express');
const userRouter = require('./controllers/user');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
	response.send();
});

app.use('/', userRouter);

app.listen(3000, () => console.log('nat na 3000'));
