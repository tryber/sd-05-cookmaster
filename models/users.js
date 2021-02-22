const getCollection = require('./connection');

const createNewUser = async (name, email, password) => {
  const newUser = await getCollection('users').then(async (user) =>
    user.insertOne({ name, email, role: 'user', password }));
  return { user: { _id: newUser.insertedId, name, email, role: newUser.ops[0].role } };
};

const emailExists = async (email) => getCollection('users').then(async (user) => user.findOne({ email }));

module.exports = { createNewUser, emailExists };
