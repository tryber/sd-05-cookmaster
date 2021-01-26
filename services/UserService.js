const UserModel = require('../models/UserModel');
const ThrowMyError = require('../middlewares/configError');

const create = async (name, email, password, role) => {
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!name || !email || !password || !validEmail.test(email)) {
    throw new ThrowMyError('Invalid entries. Try again.', 'invalid_entries');
  }

  const userByMail = await UserModel.findByEmail(email);
  if (userByMail) {
    throw new ThrowMyError('Email already registered', 'email_already_exists');
  }
  console.log('chupa trossso', role);
  return UserModel.create(name, email, password, role);
};

module.exports = { create };
