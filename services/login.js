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
  const user = await modelLogin.login(email, password);
  if (!user) {
    const err = {};
    err.isErr = true;
    err.message = 'Incorrect username or password';
    err.status = 401;
    err.code = 'invalid_data';
    throw err;
  }
  return user;
};

module.exports = { login };
