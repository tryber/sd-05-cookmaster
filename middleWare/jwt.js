const jwt = require('jsonwebtoken');
require('dotenv').config();
// secret local ou um genérico para o projeto
const secret = process.env.SECRET || 'placeholder';

const createToken = (user) => {
  const { _id, email, role } = user;
  const payload = { _id, email, role };
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = createToken;
