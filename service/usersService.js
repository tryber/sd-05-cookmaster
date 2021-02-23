const usersModel = require('../models/usersModel');

const emailValida = require('../middlewares/emailValidation');

const create = async (name, email, password) => {
  const emailExists = await usersModel.getByEmail({ email });
  const validateEmail = emailValida.validaEmail(email);
  if (!name || !email || !password) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }
  if (emailExists) {
    return {
      error: true,
      code: 'duplicate',
      message: 'Email already registered',
      statusCode: 409,
    };
  }
  if (!validateEmail) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }

  return usersModel.create(name, email, password);
};

const admin = async (name, email, password, role) => {
  const userExists = await usersModel.getByEmail(email);
  if (userExists) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Email already registered',
      statusCode: 409,
    };
  }
  if (role !== 'admin') {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Only admins can register new admins',
      statusCode: 403,
    };
  }
  return usersModel.create(name, email, password, 'admin');
};

module.exports = {
  create,
  admin,
};
