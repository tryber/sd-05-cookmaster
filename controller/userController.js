/* eslint-disable import/no-unresolved */
const { Router } = require('express');
// const rescue = require('express-rescue');
const userService = require('../service/userService');

const userRoute = Router();

userRoute.post(
  '/', async (req, res) => {
    const user = await userService.createUser(req.body);
    console.log('aqui no controller', req.body);
    if (!user) res.status(400).json({ message: 'Dados inválidos' });
    res.status(201).json(user);
  },
);

module.exports = userRoute;
