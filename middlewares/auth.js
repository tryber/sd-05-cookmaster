const jwt = require('jsonwebtoken');

const secret = 'vergonhadaprofissao';

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    jwt.verify(authorization, secret);
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
