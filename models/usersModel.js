const getCollection = require('./connection');

const getUserByEmail = async (email) =>
  getCollection('users')
    .then((user) => user.findOne({ email }));

const createUser = async (name, email, password, role = 'user') =>
  getCollection('users')
    .then((user) => user.insertOne({ name, email, password, role }))
    .then((result) => ({ _id: result.insertedId, name, email, role }));

module.exports = {
  getUserByEmail,
  createUser,
};
