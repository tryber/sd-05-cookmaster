const productModel = require('../model/userModel');

const errorMessage = (message, code) => ({ err: { message, code } });

const createUser = async ({name, email, password}) => {
  console.log(name);
  const productCreated = await productModel.addUser(name, email, password);
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailValidation = ((emailx) => emailRegex.test(String(emailx).toLowerCase()) && !!emailx);

  if (!emailValidation(email)) {
    return errorMessage('"email" invalid', 'invalid_data');
  }
  if (!name) {
    return errorMessage('"name" is required', 'invalid_data');
  }
  if (name.length < 5) {
    return errorMessage('The "name" must be at least 5 characters long.', 'invalid_data');
  }
  if (!email) {
    return errorMessage('Email is require', 'invalid_data');
  }
  if (!password) {
    return errorMessage('"password" is required', 'invalid_data');
  }
  return productCreated;
};

module.exports = { createUser };
