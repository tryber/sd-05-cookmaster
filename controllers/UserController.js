const { Router } = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../auth/validateJWT');

// Router é agrupador de middlewares
const userRouter = Router();

const UserService = require('../services/UserService');
/*  ********************************************************************************************* */
userRouter.post('/', rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const userCriado = await UserService.create(name, email, password);
  res.status(201).json({ user: userCriado });
}));

userRouter.post('/admin', validateJWT, rescue(async (req, res) => {
  const { user } = req;
  const { name, email, password } = req.body;

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  const newUser = await UserService.create(name, email, password, 'admin');

  res.status(201).json({ user: newUser });
}));

module.exports = userRouter;
