const createUserValidation = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!ingredients) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

module.exports = createUserValidation;
