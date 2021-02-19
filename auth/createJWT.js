const jwt = require('jsonwebtoken');

const secret = 'teste2021';

function createToken(payload) {
  const headers = {
    expiresIn: '1d',
    algoritm: 'HS256',
  };

  const token = jwt.sign(payload, headers, secret);

  return token;
}

module.exports = createToken;
