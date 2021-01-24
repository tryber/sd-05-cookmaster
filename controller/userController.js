/* eslint-disable import/no-unresolved */
const { Router } = require('express');
const rescue = require('express-rescue');
const userService = require('../service/userService');

const userRoute = Router();

userRoute.post(
  '/', rescue(
    async (req, res) => {
      console.log('controller', req.body);
      const user = await userService.createUser(req.body);
      if (!user) res.status(400).json({ message: 'Dados inválidos' });
      res.status(201).json(user);
    },
  ),
);

userRoute.get('/login', async (req, res) => {
  const user = await userService.login(req.body);
  if (!user) res.status(400).json({ message: 'dados inválidos' });
  res.status(201).json(user);
});

module.exports = userRoute;
