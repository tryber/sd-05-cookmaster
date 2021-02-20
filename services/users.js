const modelUsers = require('../models/users');
const verify = require('../midlewares/verify');

const insertNewUser = async (name, email, password) => {
  verify.verifyName(name);
  await verify.verifyEmail(email);
  const isUsedEmail = await modelUsers.uniqueEmail(email);
  if (isUsedEmail) {
    const err = {};
    err.isErr = true;
    err.message = 'Email already registered';
    err.status = 409;
    err.code = 'invalid_data';
    throw err;
  }
  const newUser = await modelUsers.insertNewUser(name, email, password);
  return newUser;
};

module.exports = { insertNewUser };
