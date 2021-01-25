// const { ObjectId } = require('mongodb');
const connection = require('./connection');

/*  ********************************************************************************************* */
const findByEmail = async (email) =>
  connection('users')
    .then((user) => user.findOne({ email }));

/*  ********************************************************************************************* */
const create = async (name, email, password, role) =>
  connection('users')
    .then((user) => user.insertOne({ name, email, password, role }))
    .then((result) => ({ name, email, role: 'user', _id: result.insertedId }));

module.exports = {
  create,
  findByEmail,
};
