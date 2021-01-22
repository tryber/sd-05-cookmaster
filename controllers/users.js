const { Router } = require('express');
const middlewares = require('../middlewares');
const { usersService } = require('../services');

const usersRouter = Router();

usersRouter.post('/', middlewares.validateFields, async (req, res) => {
  const userData = req.body;
  const user = await usersService.createUser(userData);
  return user
    ? res.status(201).json(user)
    : res.status(409).json({ message: 'Email already registered' });
});

module.exports = usersRouter;
