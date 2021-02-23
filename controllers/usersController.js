const { Router } = require('express');

const rescue = require('express-rescue');

const usersService = require('../service/usersService');

const auth = require('../middlewares/auth');

const users = Router();

users.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await usersService.create(name, email, password);
    if (newUser.error) {
      return res.status(newUser.statusCode).json({ message: newUser.message });
    }
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

users.post(
  '/admin',
  auth,
  rescue(async (req, res) => {
    const { user } = req;
    const { name, email, password } = req.body;

    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Only admins can register new admins' });
    }
    const newUser = await usersService.admin(
      name,
      email,
      password,
      'admin',
    );
    return res.status(201).json({ user: newUser });
  }),
);

module.exports = users;
