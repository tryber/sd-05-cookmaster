const { Router } = require('express');
const { loginUser } = require('../services/users.services');

const users = Router();

users.post('/', loginUser, (req, res) => {
  res.status(200).json({ token: req.data });
});

module.exports = users;
