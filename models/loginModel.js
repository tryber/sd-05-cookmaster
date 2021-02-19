const connectionDB = require('./connection');

const login = async (email, password) => connectionDB('users')
  .then((db) => db.insertOne({ email, password }))
  .then((result) => result.ops[0].email);

const findUser = async ({ email }) => connectionDB('users')
  .then((db) => db.findOne({ email }));

module.exports = { login, findUser };
