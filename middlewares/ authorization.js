const jwt = require('jsonwebtoken');
const findEmail = require('../models/utils');

const segredo = 'seusecretdetoken';

const authorization = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, segredo);
    const user = await findEmail(decoded.data.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = authorization;
