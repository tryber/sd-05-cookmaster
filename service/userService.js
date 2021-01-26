const userModel = require('../model/userModel');

const errorMessage = (message, code) => ({ err: { message, code } });

const getUsers = async () => {
  const allUsers = await userModel.getUsers();
  console.log('aqui no service', allUsers);
};

const getUsersByEmail = async () => {
  const userEmail = await userModel.findByEmail();
  console.log('aqui no service', userEmail);
};

const createUser = async ({ name, email, password }) => {
  if (!name) {
    return errorMessage('"name" is required', 'invalid_data');
  }
  if (!email) {
    return errorMessage('Email is require', 'invalid_data');
  }
  if (!password) {
    return errorMessage('"password" is required', 'invalid_data');
  }
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(email).toLowerCase())) {
    return errorMessage('"email" invalid', 'invalid_data');
  }
  const checkEmail = await userModel.findByEmail(email);
  if (checkEmail) return errorMessage('This "email" already exists', 'invalid_data');

  return userModel.addUser(name, email, password);
};

// terminar
// const login = async (email, password) => {
//   await userModel.Log()
// }

module.exports = { getUsers, getUsersByEmail, createUser };
