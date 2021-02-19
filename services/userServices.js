const userModel = require('../models/userModel');

async function createUser(name, email, password, role = 'user') {
  if (name === undefined || name === '') {
    return { isError: true, message: 'Invalid entries. Try again.', status: 400 };
  }
  if (password === undefined || password === '' || !password) {
    return { isError: true, message: 'Invalid entries. Try again.', status: 400 };
  }

  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  if (!emailRegex.test(email)) {
    return { isError: true, message: 'Invalid entries. Try again.', status: 400 };
  }

  const userEmail = await userModel.getEmail(email);
  if (userEmail) {
    return { isError: true, message: 'Email already registered', status: 409 };
  }

  const user = await userModel.createUser(name, email, password, role);
  return { name, email, role, _id: user.insertedId };
}

module.exports = {
  createUser,
};
