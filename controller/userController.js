/* eslint-disable import/no-unresolved */
const { Router } = require('express');
// const auth = require('../middleware/authorization');
const userModel = require('../model/userModel');
const userService = require('../service/userService');

const userRoute = Router();

userRoute.post(
  '/', userService.validateUser, async (req, res) => {
    const user = await userModel.createUser(req.body);
    console.log('aqui no controller', req.body);
    if (user.err) return res.status(400).json('Algo deu errado!');
    res.status(201).json(user);
  },
);

// userRoute.post(
//   '/admin', auth.verifyJWT,
//   async (req, res) => {
//     const { user } = req;
//     const { name, email, password } = req.body;
//     if (user.role !== 'admin') return res.status(403).json({ message: 'Only administrators can do that.' });
//     console.log('aqui no controller', req.body);
//     if (!user) res.status(400).json({ message: 'Dados inválidos' });
//     const newUser = await userModel.createUser(name, email, password);
//     res.status(201).json({ user: newUser });
//   },
// );

module.exports = userRoute;
