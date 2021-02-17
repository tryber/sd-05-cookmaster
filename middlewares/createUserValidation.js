const { validateEmail } = require('../helpers/functions');

const createUserValidation = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!email) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!password) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!email) {
    res.status(409).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = createUserValidation;
