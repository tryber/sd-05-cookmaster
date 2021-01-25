const connectionDB = require('./connection');
const { signUp, verifyEmail } = require('./usersModel');

module.exports = {
  connectionDB,
  signUp,
  verifyEmail,
};
