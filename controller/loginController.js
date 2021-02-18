/* eslint-disable import/no-unresolved */
const { Router } = require('express');
const loginService = require('../service/loginService');
const auth = require('../middleware/authorization');

const userRoute = Router();

userRoute.post(
  '/',
  loginService.validateLogin,
  async (req, res) => {
    const { email } = req.body;
    const token = await auth.validateToken(email);
    if (!token) return res.status(502).json({ message: 'Bad Gateway' }); // verificar menssagem
    return res.status(200).json({ token });
  },
);

module.exports = userRoute;
