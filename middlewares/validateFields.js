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

const validateEntries = (formData, from) => {
  switch (from) {
    case 'login':
      return isValidEmail(formData.email) && isValidPassword(formData.password);
    case 'users':
      return (
        isValidName(formData.name)
        && isValidEmail(formData.email)
        && isValidPassword(formData.password)
      );
    default:
      return (!!formData.name && !!formData.preparation && formData.ingredients);
  }
};

module.exports = (req, res, next) => {
  const formData = req.body;
  // req.baseUrl = The URL path on which a router instance was mounted.
  const from = req.baseUrl.slice(1);
  const message = from === 'login' ? 'All fields must be filled' : 'Invalid entries. Try again.';
  const code = from === 'login' ? 401 : 400;
  // if login === true, user is trying to login, else, is trying to register
  return validateEntries(formData, from) ? next() : res.status(code).json({ message });
};
