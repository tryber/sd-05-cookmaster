const getConnection = require('./connection');

const insertNewUser = async (name, email, password) => getConnection().then(async (db) => {
  const newUser = await db.collection('users').insertOne({ name, email, role: 'user', password });
  const user = { user: { name, email, role: newUser.ops[0].role, _id: newUser.insertedId } };
  return user;
});

const uniqueEmail = async (email) => getConnection().then((db) =>
  db.collection('users').findOne({ email }));

module.exports = { insertNewUser, uniqueEmail };
