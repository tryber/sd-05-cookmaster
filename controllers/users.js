const { Router } = require('express');
const middlewares = require('../middlewares');
const { usersService } = require('../services');

const usersRouter = Router();

usersRouter.post('/', middlewares.validateFields, async (req, res) => {
  const user = await usersService.createUser(req.body);
  return user
    ? res.status(201).json(user)
    : res.status(409).json({ message: 'Email already registered' });
});

usersRouter.post('/admin', middlewares.auth, middlewares.validateFields, async (req, res) => {
  if (req.headers.role === 'admin') {
    req.body.role = req.headers.role;
    const user = await usersService.createUser(req.body);
    return user
      ? res.status(201).json(user)
      : res.status(409).json({ message: 'Email already registered' });
  }
  return res.status(403).json({ message: 'Only admins can register new admins' });
});

module.exports = usersRouter;
