// returns true if name is not undefined
const isValidName = (name) => !!name;

const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // !undefined === true
  // !!undefined === false
  // if param is not undefined... returns true
  return re.test(String(email).toLowerCase()) && !!email;
};

const isValidPassword = (password) => !!password;

const validateEntries = (userData, login) => {
  const { name, email, password } = userData;
  return login
    ? isValidEmail(email) && isValidPassword(password)
    : isValidName(name) && isValidEmail(email) && isValidPassword(password);
};

module.exports = (req, res, next) => {
  const userData = req.body;
  // req.baseUrl = The URL path on which a router instance was mounted.
  const login = req.baseUrl.includes('login');
  const message = login ? 'All fields must be filled' : 'Invalid entries. Try again.';
  const code = login ? 401 : 400;
  // if login === true, user is trying to login, else, is trying to register
  if (!validateEntries(userData, login)) return res.status(code).json({ message });
  next();
};
