const userModel = require('../models/user');

const isEmailValid = (email) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return re.test(email);
};

const INVALID_DATA = {
  message: 'Invalid entries. Try again.',
  status: 400,
};

const EMAIL_CONFLICT = {
  message: 'Email already registered',
  status: 409,
};

const registerUser = async (req, _res, next) => {
  const { name, email, password } = req.body;

  const invalidData = !name || !email || !isEmailValid(email) || !password;
  if (invalidData) return next(INVALID_DATA);

  const emailAlreadyExists = await userModel.find({ email });
  if (emailAlreadyExists) return next(EMAIL_CONFLICT);

  req.data = await userModel.register({ name, email, password, role: 'user' });
  next();
};

module.exports = {
  registerUser,
};
