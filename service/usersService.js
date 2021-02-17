const model = require('../models/usersModel');

const emailValida = require('../middlewares/emailValidation');

const create = async (name, email, password) => {
  const emailExists = await model.getByEmail({ email });
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

  return model.create(name, email, password);
};

module.exports = {
  create,
};
