const modelLogin = require('../models/login');
// const verify = require('../midlewares/verify');

const login = async (email, password) => {
  if (!email || !password) {
    const err = {};
    err.isErr = true;
    err.message = 'All fields must be filled';
    err.status = 401;
    err.code = 'invalid_data';
    throw err;
  }
  const token = await modelLogin.login(email);
  if (!token || !token.email || token.password !== password) {
    const err = {};
    err.isErr = true;
    err.message = 'Incorrect username or password';
    err.status = 401;
    err.code = 'invalid_data';
    throw err;
  }
  return token;
};

module.exports = { login };
