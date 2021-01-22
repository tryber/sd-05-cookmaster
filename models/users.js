// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const login = async (email, password) => connection('users').then((users) => users.findOne({ email, password }));

const createUser = async ({ name, email, password, role = 'user' }) => {
  // email não cadastrado retorna null, cadastrado retorna o documento correspondente
  const emailAlreadyExists = await connection('users')
    .then((users) => users.findOne({ email }));

  const newUser = await connection('users')
    .then((users) => users.insertOne({ name, email, password, role }));
  const user = { _id: newUser.insertedId, name, email, role };

  return emailAlreadyExists ? false : { user };
};

module.exports = { login, createUser };
