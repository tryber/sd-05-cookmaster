const loginModel = require('../models/login');
// const { loginSchema } = require('../utils/verify');

const login = async (email, password) => {
  if (!email || !password) {
    const error = {};
    error.status = 401;
    error.message = 'All fields must be filled';
    throw error;
  }

  const result = await loginModel.login(email, password);
  if (!result) {
    const error = {};
    error.status = 401;
    error.message = 'Incorrect username or password';
    throw error;
  }
  return result;
};

module.exports = { login };
