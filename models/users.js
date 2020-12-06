const connection = require('./connection');

const create = async (name, email, password) =>
  connection('users')
    .then((user) => user.insertOne({ name, email, password }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      email,
      role: 'user',
    }));

const findByEmail = async (emailParam) =>
  connection('users').then((user) => user.findOne({ email: emailParam }));

module.exports = {
  create,
  findByEmail,
};
