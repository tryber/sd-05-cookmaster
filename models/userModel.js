const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

async function createUser(name, email, password, role) {
  return getConnection('users').then((db) => db.insertOne({ name, email, password, role }));
}

async function getEmail(email) {
  return getConnection('users').then((db) => db.findOne({ email }));
}

async function findById(id) {
  return getConnection('users').then((db) => db.findOne({ _id: ObjectId(id) }));
}

module.exports = {
  createUser,
  getEmail,
  findById,
};
