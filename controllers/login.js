const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const loginServices = require('../services/loginServices');
const userModel = require('../models/userModel');
// const createToken = require('../auth/createJWT');

// Endpoint para fazer o login do usuário

router.post(
  '/login',
  async (req, res) => {
    const { email, password } = req.body;
    const logUser = await loginServices.login(email, password);
    if (!logUser) { return res.status(400).json({ message: 'Login was not possible' }); }

    const secret = 'teste2021';

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const user = await userModel.getEmail(email);

    const { password: _, ...userWithoutPassword } = user;
    const { _id: id } = userWithoutPassword;
    const payload = {
      sub: id,
      userData: userWithoutPassword,
    };

    const tokenUser = jwt.sign(payload, secret, jwtConfig);
    // Retorna token ao usuário
    return res.status(200).json({ tokenUser });
  },
);

module.exports = router;
