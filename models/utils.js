const connection = require('./connection');

const findEmail = async (input) =>
  connection()
    .then((db) => db.collection('users').findOne({ email: input }));

module.exports = findEmail;
