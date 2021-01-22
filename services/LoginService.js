const UserModel = require('../models/UserModel');
const ThrowMyError = require('../middlewares/configError');
const jwt = require('jsonwebtoken');

/*  ********************************************************************************************* */
const secret = 'lyumbinka';

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const getUser = async (email, password) => {
  if (!email || !password ) {
    throw new ThrowMyError('All fields must be filled', 'fields_filled');
  }

  const userByMail = await UserModel.findByEmail(email);
  if (!userByMail || userByMail.password !== password) {
    throw new ThrowMyError('Incorrect username or password', 'invalid_login');
  }

  const { password: _, ...userWithoutPassword } = userByMail;
  const payload = { userWithoutPassword };

  return jwt.sign(payload, secret, jwtConfig);
};

module.exports = { getUser };
