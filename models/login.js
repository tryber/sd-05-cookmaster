const getCollection = require('./connection');

const login = async (email, password) => {
  const user = getCollection('users').then((loginData) => loginData.findOne({ email, password }));
  return user;
};
module.exports = { login };
