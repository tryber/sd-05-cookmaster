const getCollection = require('./connection');

const createUserModel = async (name, email, password, role = 'user') =>
  getCollection('users')
    .then((users) => users.insertOne({ name, email, password, role }))
    .then((results) => ({ user: { name, email, role, _id: results.insertedId } }));

const emailModel = async (email) =>
  getCollection('users').then((users) => users.findOne({ email }));

module.exports = { createUserModel, emailModel };
