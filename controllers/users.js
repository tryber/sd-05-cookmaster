const { Router } = require('express');
const usersServices = require('../services/users');

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await usersServices.insertNewUser(name, email, password);
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
});

module.exports = usersRouter;
