const jwt = require('jsonwebtoken');

const LIFE_TIME = 3600;
const SECRET = 'qwerty123';

const generateToken = (payload) => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + LIFE_TIME,
  payload,
}, SECRET);

const verifyToken = (token) => jwt.verify(
  token,
  SECRET,
).catch(() => { throw new Error('JWT malformed'); });

module.exports = {
  generateToken,
  verifyToken,
};
