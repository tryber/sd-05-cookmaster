const jwt = require('jsonwebtoken');

const LIFE_TIME = 3600;
const SECRET = 'qwerty123';

const generateToken = (payload) => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + LIFE_TIME,
  payload,
}, SECRET);

const verifyToken = (token) => {
  try {
    return jwt.verify(
      token,
      SECRET,
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
