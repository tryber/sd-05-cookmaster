/* eslint-disable import/no-unresolved */
const { Router } = require('express');
// const rescue = require('express-rescue');
const userService = require('../service/userService');

const userRoute = Router();

userRoute.post(
  '/', async (req, res) => {
    console.log('aqui no controller', req.body);
    const user = await userService.createUser(req.body);
    if (!user) res.status(400).json({ message: 'Dados inválidos' });
    res.status(201).json(user);
  },
);

userRoute.get('/', async (_req, res) => {
  const user = await userService.getUsersByEmail();
  if (!user) res.status(400).json({ message: 'dados inválidos' });
  res.status(201).json(user);
});

module.exports = userRoute;
