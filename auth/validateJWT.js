const jwt = require('jsonwebtoken');
const model = require('../models/userModel');

// Secret usado pra gerar o token
const segredo = 'teste2021';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, segredo);

    const user = await model.getEmail(decoded.email);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
