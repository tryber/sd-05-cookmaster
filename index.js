const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookRouter = require('./services/cookRouter');

const app = express();

app.use(bodyParser.json());
app.use('/', cookRouter);
// app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'uploads')));

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening @ port: ${PORT}`));
