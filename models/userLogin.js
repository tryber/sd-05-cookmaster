// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const role = 'user';

const createUser = async (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

const findEmail = async (input) =>
  connection()
    .then((db) => db.collection('users').findOne({ email: input }));

module.exports = {
  createUser,
  findEmail,
};
