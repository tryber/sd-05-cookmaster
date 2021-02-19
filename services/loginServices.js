const userModel = require('../models/userModel');

async function login(email, password) {
  if (!password || !email) {
    return { isError: true, message: 'All fields must be filled', status: 401 };
  }

  const registeredUser = await userModel.getEmail(email);
  if (!registeredUser || registeredUser.password !== password) {
    return { isError: true, message: 'Incorrect username or password', status: 401 };
  }
}

module.exports = {
  login,
};
