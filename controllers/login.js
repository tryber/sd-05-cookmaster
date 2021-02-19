const express = require('express');

const router = express.Router();

const loginService = require('../services/loginServices');
const createToken = require('../auth/createJWT');

// Endpoint para fazer o login do usuário

router.post(
  '/login',
  async (req, res) => {
    const { email, password } = req.body;
    const logUser = await loginService.login(email, password);
    if (!logUser.isError) { return res.status(logUser.status).json({ message: logUser.message }); }
    const tokenUser = await createToken(logUser);
    res.status(201).json({ tokenUser });
  },
);

module.exports = router;
