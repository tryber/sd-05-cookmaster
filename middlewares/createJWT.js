const jwt = require('jsonwebtoken');
const { usersService } = require('../services');

const secret = 'vergonhadaprofissao';

module.exports = async (req, res, next) => {
  const payload = await usersService.login(req.body) || null;
  const headers = { expiresIn: '12h', algorithm: 'HS256' };
  if (!payload) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  req.headers.authorization = jwt.sign(payload, secret, headers);
  return next();
};
