const getConnection = require('./connection');

const login = async (email, password) => {
  const user = getConnection().then((db) =>
    db.collection('users').findOne({ email, password }));
  return user;
};
module.exports = { login };
