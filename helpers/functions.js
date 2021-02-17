const { findEmail } = require('../models/createUser');

const getter = (data) => {
  const element = data;
  return element;
};

const validateEmail = (email) => {
  const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return reg.test(email.toString().toLowerCase());
};

const checkEmail = async (input) => findEmail(input);

module.exports = {
  getter,
  validateEmail,
  checkEmail,
};
