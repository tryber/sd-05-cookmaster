/* eslint-disable import/no-unresolved */
const { Router } = require('express');
const userService = require('../service/userService');

const userRoute = Router();

userRoute.post(
  '/', async (req, res) => {
    console.log('controller', req.body);
    const user = await userService.createUser(req.body);
    if (!user) res.status(400).json({ message: 'Dados inválidos' });
    res.status(201).json(user);
  },
);

module.exports = userRoute;
