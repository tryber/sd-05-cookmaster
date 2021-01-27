/* eslint-disable import/no-unresolved */
const { Router } = require('express');
// const rescue = require('express-rescue');
const userService = require('../service/userService');

const userRoute = Router();

userRoute.get('/', async (req, res) => {
  const login = await userService.userLogin(req.body);
  if (!login) res.status(400).json({ message: 'dados inválidos' });
  res.status(201).json(login);
});

module.exports = userRoute;