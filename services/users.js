const userModel = require('../models/users');
// const { newUserSchema, invalidData } = require('../utils/verify');

const createNewUser = async (name, email, password) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const validEmail = emailRegexp.test(email);
  if (!name || !email || !validEmail || !password) {
    const error = {};
    error.status = 400;
    error.message = 'Invalid entries. Try again.';
    throw error;
  }

  const validateEmail = await userModel.emailExists(email);
  if (validateEmail) {
    const error = {};
    error.status = 409;
    error.message = 'Email already registered';
    throw error;
  }
  const newUser = await userModel.createNewUser(name, email, password);
  return newUser;
};

module.exports = { createNewUser };
