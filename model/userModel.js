/* eslint-disable no-undef */
const connection = require('./connection');

const addUser = async (name, email, password, role = 'user') =>
  connection()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role })
      .then((result) => result.ops[0])
      .catch((err) => console.log(err)));

const findByEmailndPassword = async (email) =>
  getConnection()
    .then((db) => db.collection('users').findOne({ email }))
    .catch((err) => console.log(err));

const findById = async (id) =>
  getConnection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => console.log(err));

module.exports = {
  addUser,
  findByEmailndPassword,
  findById,
};
