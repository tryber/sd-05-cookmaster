const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');
const { userAuthenticate } = require('../middlewares/userAuthenticate');
const { loginAuthenticate } = require('../middlewares/loginAuthenticate');

const secret = 'tumpero';

const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const usersRouter = express.Router();

// Requisito 1 - Crie um endpoint para o cadastro de usuários
usersRouter.post('/users', userAuthenticate, rescue(async (req, res, _) => {
  const { name, email, password, role } = req.body;
  const user = await userModel.createUser(name, email, password, role);
  res.status(201).json({ user });
}));

// Requisito 2 - Crie um endpoint para o login de usuários
usersRouter.post('/login', loginAuthenticate, rescue(async (req, res, _) => {
  const token = await jwt.sign({ data: req.body }, secret, jwtConfig);
  res.status(200).json({ token });
}));

module.exports = usersRouter;
