const express = require('express');
const bodyParser = require('body-parser');
const cookRouter = require('./services/cookRouter');

const app = express();
app.use(bodyParser.json());
app.use('/', cookRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening @ port: ${PORT}`));
