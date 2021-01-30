/* eslint-disable import/no-unresolved */
const { Router } = require('express');
const { verifyJWT } = require('../middleware/authorization');
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

userRoute.post(
  '/admin', verifyJWT, // nedd to solve that
  async (req, res) => {
    const { user } = req;
    const { name, email, password } = req.body;
    if (user.role !== 'admin') return res.status(403).json({ message: 'Only administrators can do that.' });
    console.log('aqui no controller', req.body);
    if (!user) res.status(400).json({ message: 'Dados inválidos' });
    const newUser = await userService.createUser(name, email, password);
    res.status(201).json({ user: newUser });
  },
);

module.exports = userRoute;
