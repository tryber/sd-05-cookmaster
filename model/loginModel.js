const getCollection = require('./connection');

const loginModel = async (email, password) =>
  getCollection('users')
    .then((user) => user.insertOne({ email, password }))
    .then((result) => result.ops[0].email);

const emailModel = async ({ email }) =>
  getCollection('users').then((user) => user.findOne({ email }));

module.exports = { loginModel, emailModel };
