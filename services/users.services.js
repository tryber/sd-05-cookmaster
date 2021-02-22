const { generateToken } = require('../auth/token.auth');
const userModel = require('../models/user');

const isEmailValid = (email) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return re.test(email);
};

const INVALID_ENTRIES = {
  message: 'Invalid entries. Try again.',
  status: 400,
};

const EMAIL_CONFLICT = {
  message: 'Email already registered',
  status: 409,
};

const INVALID_FIELDS = {
  message: 'All fields must be filled',
  status: 401,
};

const UNAUTHORIZED_LOGIN = {
  message: 'Incorrect username or password',
  status: 401,
};

const loginUser = async (req, _res, next) => {
  const { email, password } = req.body;

  const invalidData = !email || !isEmailValid(email) || !password;
  if (invalidData) return next(INVALID_FIELDS);

  const userFound = await userModel.login({ email, password });
  if (!userFound) return next(UNAUTHORIZED_LOGIN);

  const { _id, role } = userFound;
  req.data = await generateToken({ _id, role, email });
  next();
};

const registerUser = async (req, _res, next) => {
  const { name, email, password } = req.body;

  const invalidData = !name || !email || !isEmailValid(email) || !password;
  if (invalidData) return next(INVALID_ENTRIES);

  const emailAlreadyExists = await userModel.find({ email });
  if (emailAlreadyExists) return next(EMAIL_CONFLICT);

  req.data = await userModel.register({ name, email, password, role: 'user' });
  next();
};

module.exports = {
  loginUser,
  registerUser,
};
