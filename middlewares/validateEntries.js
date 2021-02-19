const isEmailValid = (email) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return re.test(email);
};

const INVALID_ENTRIES = {
  message: 'Invalid entries. Try again.',
  status: 400,
};

module.exports = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !isEmailValid(email) || !password) next(INVALID_ENTRIES);
  next();
};
