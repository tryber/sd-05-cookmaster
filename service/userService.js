const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');

const secret = 'master of puppets';

const errorMessage = (message, code) => ({ err: { message, code } });

const createUser = async ({ name, email, password }) => {
  if (!name) {
    return errorMessage('Name is required', 'invalid_data');
  }
  if (!email) {
    return errorMessage('Email is require', 'invalid_data');
  }
  if (!password) {
    return errorMessage('Password is required', 'invalid_data');
  }
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(email).toLowerCase())) {
    return errorMessage('"email" invalid', 'invalid_data');
  }
  const checkEmail = await userModel.findByEmail(email);
  if (checkEmail) return errorMessage('This email already exists', 'invalid_data');

  return userModel.addUser(name, email, password);
};

const userLogin = async (email, password) => {
  console.log('user service:', email);
  const user = await userModel.findByEmail(email);
  if (!user) return errorMessage('Incorrect username or password', 'invalid_data');
  if (password !== user.password) return errorMessage('Incorrect username or password', 'invalid_data');
  const tokenConfig = { expiresIn: '8h', algorithm: 'HS256' };
  const token = jwt.sign({ name: user.name, email, role: user.role }, secret, tokenConfig);
  return { token };
};

module.exports = { createUser, userLogin };
