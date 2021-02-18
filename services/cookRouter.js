const express = require('express');

const middlewares = require('../middlewares');
const createUserController = require('../controllers/createUserController');
const userLoginController = require('../controllers/userLoginController');

const cookRouter = express.Router();

cookRouter.get('/', (_req, res) => {
  res.send();
});

cookRouter.post('/users', middlewares.createUserValidation, createUserController);
cookRouter.post('/login', middlewares.loginValidation, userLoginController);

module.exports = cookRouter;
