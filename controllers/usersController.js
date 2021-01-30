const { Router } = require('express');
const rescue = require('express-rescue');
const usersService = require('../services/usersService');
const { generateToken } = require('../utils/generateToken');

const usersRouter = Router();

usersRouter.post('/users', rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await usersService.createUser(name, email, password);

  if (user.error) {
    return res.status(user.error.code).json({ message: user.error.message });
  }

  res.status(201).json({ user });
}));

usersRouter.post('/login', rescue(async (req, res) => {
  const { email, password } = req.body;

  const user = await usersService.login(email, password);

  if (user.error) {
    return res.status(user.error.code).json({ message: user.error.message });
  }

  const token = await generateToken(user);

  return res.status(200).json({ token });
}));

module.exports = usersRouter;
