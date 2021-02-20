const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const loginServices = require('../services/loginServices');
const userModel = require('../models/userModel');

// Endpoint para fazer o login do usuário

router.post(
  '/login',
  async (req, res) => {
    const { email, password } = req.body;
    const logUser = await loginServices.login(email, password);
    if (logUser.isError) { return res.status(logUser.status).json({ message: logUser.message }); }

    const secret = 'teste2021';

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const user = await userModel.getEmail(email);

    const { password: _, ...userWithoutPassword } = user;
    console.log(userWithoutPassword);
    const payload = userWithoutPassword;

    if (password !== user.password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const tokenUser = jwt.sign(payload, secret, jwtConfig);
    // Retorna token ao usuário
    return res.status(200).json({ token: tokenUser });
  },
);

module.exports = router;
