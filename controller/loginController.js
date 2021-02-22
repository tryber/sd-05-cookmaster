const jwt = require('jsonwebtoken');
const { Router } = require('express');
const rescue = require('express-rescue');
// const service = require('../service/loginService');
const { emailModel } = require('../model/UserModel');

const login = Router();

const secret = 'secretPassword';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

login.post(
  '/',
  rescue(async (req, res) => {
    try {
      const { email } = req.body;
      const { password } = req.body;

      if (!email || !password) {
        return res.status(401).json({ message: 'All fields must be filled' });
      }

      // const loginIsValid = await service.loginService(req.body);
      const user = await emailModel({ email });

      if (!user || password !== user.password) {
        return res.status(401).json({ message: 'Incorrect username or password' });
      }

      //const { password, name, ...nonRegister } = loginIsValid;

      delete user.password;

      const payload = {
        iss: 'post-api',
        aud: 'identify',
        user,
      };

      const token = jwt.sign(payload, secret, jwtConfig);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal error' });
    }
  })
);

module.exports = login;
