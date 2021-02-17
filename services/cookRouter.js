const express = require('express');

const middlewares = require('../middlewares');
const createUserController = require('../controllers/createUserController');

const cookRouter = express.Router();

cookRouter.get('/', (_req, res) => {
  res.send();
});

cookRouter.post('/users', middlewares.createUserValidation, createUserController);

module.exports = cookRouter;
