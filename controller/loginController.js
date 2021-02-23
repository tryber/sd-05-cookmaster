const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { emailModel } = require('../model/loginModel');

const login = Router();

const secret = 'secretPassword';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

login.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }

    const user = await emailModel({ email });

    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    delete user.password;

    const payload = {
      iss: 'post_api',
      aud: 'identify',
      user,
    };

    const token = jwt.sign(payload, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: `Intern Error: ${error}` });
  }
});

module.exports = login;
