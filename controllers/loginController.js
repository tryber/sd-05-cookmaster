const { Router } = require('express');

const jwt = require('jsonwebtoken');

const loginRouter = Router();
const { findUser } = require('../models');

const secret = 'secretPassword';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

loginRouter.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }

    const user = await findUser({ email }); // pegando o user no banco a partir do email

    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    // const userFake = await signUp(email);
    // const { password: _, ...userWithoutPassword } = user

    delete user.password;

    const payload = {
      // Issuer => Quem emitiu o token
      iss: 'post_api',
      // Audience => Quem deve aceitar este token
      aud: 'identify',
      // Subject => A quem pertence esse token
      // sub: user._id,
      user,
    };

    const token = jwt.sign(payload, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: `Intern Error: ${error}` });
  }
});

module.exports = loginRouter;
