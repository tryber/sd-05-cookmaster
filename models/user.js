const connection = require('./connection');

const find = async (document) => {
  const user = await connection('users')
    .then((users) => users.findOne(document))
    .catch((err) => {
      console.error(err);
      return null;
    });

  return user;
};

const register = async ({ name, email, password, role = 'user' }) => {
  const newUser = await connection('users')
    .then((users) => users.insertOne({
      name,
      email,
      password,
      role,
    }))
    .catch((err) => {
      console.error(err);
      return null;
    });

  return {
    _id: newUser.insertedId,
    name,
    email,
    password,
    role,
  };
};

module.exports = {
  find,
  register,
};
