const { Router } = require('express');
const rescue = require('express-rescue');
// const validateJWT = require('../auth/validateJWT');

// Router é agrupador de middlewares
const userRouter = Router();

const UserService = require('../services/UserService');
/*  ********************************************************************************************* */
userRouter.post('/', rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const userCriado = await UserService.create(name, email, password);
  res.status(201).json({ user: userCriado });
}));

module.exports = userRouter;
