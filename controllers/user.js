const express = require('express');
// const rescue = require('express-rescue');
// VERIFICAR NOVO USUARIO
const router = express.Router();

const userService = require('../services/userServices');
// const erroMsg = require('../middlewares/erroResponse');

// Endpoint para adicionar novo usuário

router.post(
  '/users',
  // checkUser,
  async (req, res) => {
    const { name, email, password, role } = req.body;
    const addUser = await userService.createUser(name, email, password, role);
    if (addUser.isError) { return res.status(addUser.status).json({ message: addUser.message }); }
    // if (!addUser) return res.status(400).json({ message: 'User was not created' });
    res.status(201).json({ user: addUser });
  },
);

module.exports = router;
