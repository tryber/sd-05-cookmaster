// const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const signUp = async (name, email, password, role = 'user') => connectionDB('users')
  .then((db) => db.insertOne({ name, email, password, role }))
  .then((result) => ({ user: { name, email, role, _id: result.insertedId } }));

const verifyEmail = async (email) => connectionDB('users')
  .then((db) => db.findOne({ email }));

module.exports = { signUp, verifyEmail };
