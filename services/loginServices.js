const userModel = require('../models/userModel');

async function login(email, password) {
  if (password === undefined || password === '' || !password) {
    return { isError: true, message: 'All fields must be filled', status: 401 };
  }

  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  if (!emailRegex.test(email)) {
    return { isError: true, message: 'Incorrect username or password', status: 401 };
  }

  const registeredUser = await userModel.getEmail(email);
  if (!registeredUser || registeredUser.password !== password) {
    return { isError: true, message: 'Incorrect username or password', status: 401 };
  }
}

module.exports = {
  login,
};
