const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secretKey = '9c4e93c0efb98664abc16c3020bf697946b5c7fd18a2dd0f29a798de2d7b3688';

const createUser = async (req, res) => {
  const newUser = req.body;
  const result = await userModel.create(newUser);
  console.log('usuário criado');
  return !result
    ? res.status(500).json({ message: 'Não foi possivel criar o usuario' })
    : res.status(201).json({ message: 'usuario criado com sucesso', user: result });
};

const updateUser = async (req, res) => {
  const userId = req.body.id;
  const userToUpdate = req.body.user;
  const result = await userModel.update(userId, userToUpdate);
  return !result
    ? res.status(500).json({ message: 'Não foi possivel atualizar o usuario' })
    : res.status(200).json({ message: 'usuario atualizado com sucesso' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const loggedUser = await userModel.find({ email, password });

  if (loggedUser == null) return res.status(401).json({ message: 'Incorrect username or password' });

  if (!loggedUser) return res.status(500).json({ message: 'Error on database' });

  jwt.sign(loggedUser, secretKey, (error, token) => {
    if (error) return res.status(500).json({ message: 'erro ao gerar token', error });
    return res.status(200).json({ token });
  });
};

const removeUser = async (_req, _res) => {};

const getUser = async (_req, _res) => {};

module.exports = {
  createUser,
  updateUser,
  login,
  removeUser,
  getUser,
};
