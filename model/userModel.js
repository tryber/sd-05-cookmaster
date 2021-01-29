/* eslint-disable no-undef */
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getUsers = async () =>
  connection()
    .then((db) => db.collection('users').find().toArray())
    .then((users) =>
      users.map(({ _id, name, email, password, role }) => ({
        id: _id, name, email, password, role,
      })))
    .catch((err) => err);

const addUser = async (name, email, password, role = 'user') =>
  connection()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role })
      .then((result) => result.ops[0])
      .catch((err) => console.log(err)));

const findByEmail = async (email) =>
  connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((result) => result)
    .catch((err) => console.log(err));

const findById = async (id) =>
  connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => console.log(err));

module.exports = {
  getUsers,
  addUser,
  findByEmail,
  findById,
};
