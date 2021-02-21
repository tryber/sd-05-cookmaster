const connection = require('./connection');

const role = 'user';

const createUser = async (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

module.exports = createUser;
