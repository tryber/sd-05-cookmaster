const jwt = require('jsonwebtoken');
const { usersService } = require('../services');

const secret = 'vergonhadaprofissao';

module.exports = async (req, res, next) => {
  const userData = req.body;
  const verify = await usersService.login(userData);
  const headers = {
    // desliga o token de notche
    expiresIn: '12h',
    algorithm: 'HS256',
  };
  const payload = verify ? { email: verify.email } : null;
  const token = verify ? jwt.sign(payload, secret, headers) : null;
  req.headers.authorization = token || null;
  return next();
};
