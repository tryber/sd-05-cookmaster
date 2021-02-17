const jwt = require('jsonwebtoken');
const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../service/loginService');

const login = Router();

const senha = 'senhaSecreta';

const config = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

login.post(
  '/',
  rescue(async (req, res, next) => {
    const loginIsValid = await service.loginService(req.body);

    if (loginIsValid.error) {
      return next(loginIsValid);
    }

    const { password, name, ...nonRegister } = loginIsValid;

    const payload = {
      iss: 'post-api',
      aud: 'identify',
      sub: loginIsValid.id,
      userData: nonRegister,
    };

    const token = jwt.sign(payload, senha, config);

    res.status(200).json({ token });
  }),
);

module.exports = login;
