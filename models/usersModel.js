const connection = require('./connection');

const createUser = (name, email, password, role = 'user') =>
  connection('users').then((users) =>
    users.insertOne({ name, email, password, role }).then((result) => ({
      _id: result.insertedId,
      name,
      email,
      password,
      role,
    })));

const verifyEmail = (email) =>
  connection('users').then((users) => users.findOne({ email }));

module.exports = { createUser, verifyEmail };
