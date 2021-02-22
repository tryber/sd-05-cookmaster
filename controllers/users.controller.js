const { Router } = require('express');
const { registerUser } = require('../services/users.services');

const users = Router();

users.post('/', registerUser, (req, res) => {
  res.status(201).json({ user: req.data });
});

module.exports = users;
