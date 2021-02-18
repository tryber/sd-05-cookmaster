module.exports = async (err, _req, res, _next) => {
  const { error, ...secondError } = err;

  if (err.message === 'Invalid entries. Try again.') {
    return res.status(400).json(secondError);
  }

  if (err.message === 'Email already registered') {
    return res.status(400).json(secondError);
  }

  if (err.message === 'All fields must be filled') {
    return res.status(401).json(secondError);
  }

  if (err.message === 'Incorrect email or password') {
    return res.status(401).json(secondError);
  }

  if (err.message === 'jwt malformed') {
    res.status(401).json(errorWithoutError);
  }
};
