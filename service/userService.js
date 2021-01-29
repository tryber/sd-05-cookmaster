const userModel = require('../model/userModel');
const { createToken } = require('../middleware/authorization');

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
  const userData = await userModel.findByEmail(email);
  if (!userData) return errorMessage('Incorrect username or password', 'invalid_data');
  if (password !== userData.password) return errorMessage('Incorrect username or password 2', 'invalid_data');
  const token = createToken(userData);
  return { token };
};

module.exports = { createUser, userLogin };
