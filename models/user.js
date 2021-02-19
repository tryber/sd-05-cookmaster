const connection = require('./connection');

const register = async ({ name, email, password, role = 'user' }) => {
  const emailAlreadyExists = await connection('users')
    .then((users) => users.findOne({ email }));

  if (emailAlreadyExists) return null;

  const newUser = await connection('users')
    .then((users) => users.insertOne({
      name,
      email,
      password,
      role,
    }));

  return {
    _id: newUser.insertedId,
    name,
    email,
    password,
    role,
  };
};

module.exports = {
  register,
};
