const { Router } = require('express');

const users = Router();

const usersServices = require('../service/usersService');

users.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await usersServices.create(name, email, password);
    if (newUser.error) {
      return res.status(newUser.statusCode).json({ message: newUser.message });
    }
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Tá errado!!!' });
  }
});

module.exports = users;
