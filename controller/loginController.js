/* eslint-disable import/no-unresolved */
const { Router } = require('express');
// const rescue = require('express-rescue');
const userService = require('../service/userService');

const userRoute = Router();

userRoute.post('/', async (req, res) => {
  const { email, password } = req.body;
  const login = await userService.userLogin(email, password);
  if (login.err) return res.status(400).json({ message: 'dados inválidos' }); // verificar menssagem
  res.status(201).json(login);
});

module.exports = userRoute;
