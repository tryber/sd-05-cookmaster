const connectionDB = require('./connection');
const { signUp, verifyEmail } = require('./usersModel');
const { login, findUser } = require('./loginModel');

module.exports = {
  connectionDB,
  signUp,
  verifyEmail,
  login,
  findUser,
};
