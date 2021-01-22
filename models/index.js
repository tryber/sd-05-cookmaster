const connection = require('./connection');
const { createUser, login } = require('./users');
// const login = require('./users');

module.exports = {
  connection,
  createUser,
  login,
};
