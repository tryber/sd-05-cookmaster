// const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const signUp = async (name, email, password) => connectionDB('users')
  .then((db) => db.insertOne({ name, email, password }))
  .then((result) => ({ user: { name, email, role: 'user', _id: result.insertedId } }));

const verifyEmail = async (email) => connectionDB('users')
  .then((db) => db.findOne({ email }));

module.exports = { signUp, verifyEmail };
