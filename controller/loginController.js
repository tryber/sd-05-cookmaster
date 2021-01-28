/* eslint-disable import/no-unresolved */
const { Router } = require('express');
// const rescue = require('express-rescue');
const userService = require('../service/userService');

const userRoute = Router();

userRoute.get('/', async (req, res) => {
  const { email, password } = req.body;
  const login = await userService.userLogin(email, password);
  console.log('aqui no Logincontroller', req.body);
  if (!login) res.status(400).json({ message: 'dados inválidos' });
  res.status(201).json(login);
});

module.exports = userRoute;
