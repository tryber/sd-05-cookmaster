const jwt = require('jsonwebtoken');
require('dotenv').config();
// secret local ou um genérico para o projeto
const secret = process.env.SECRET || 'placeholder';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const payload = jwt.verify(authorization, secret);
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateToken };
