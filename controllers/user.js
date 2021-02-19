const express = require('express');

const router = express.Router();

const userService = require('../services/userServices');

// Endpoint para adicionar novo usuário

router.post(
  '/users',
  async (req, res) => {
    const { name, email, password, role } = req.body;
    const addUser = await userService.createUser(name, email, password, role);
    if (addUser.isError) { return res.status(addUser.status).json({ message: addUser.message }); }
    res.status(201).json({ user: addUser });
  },
);

module.exports = router;
