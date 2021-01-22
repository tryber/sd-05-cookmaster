const connection = require('./connection');

const login = async (email, password) => {
  const user = await connection('users')
    .then((users) => users.findOne({ email, password }));
  if (user) {
    const { _id, role } = user;
    return { _id, role };
  }
  return null;
};

const createUser = async ({ name, email, password, role = 'user' }) => {
  // email already in use returns null -- a new email creates and returns a new user
  const emailAlreadyExists = await connection('users')
    .then((users) => users.findOne({ email }));

  if (emailAlreadyExists) return null;

  const newUser = await connection('users')
    .then((users) => users.insertOne({ name, email, password, role }));
  const user = { _id: newUser.insertedId, name, email, role };

  return { user };
};

module.exports = { login, createUser };
