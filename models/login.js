const getConnection = require('./connection');

const login = async (email) => {
  const token = getConnection().then((db) =>
    db.collection('users').findOne({ email }));
  return token;
};
module.exports = { login };
