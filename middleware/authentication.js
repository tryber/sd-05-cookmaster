const jwt = require('jsonwebtoken');
require('dotenv').config();
// const model = require('../model/UserModel');

const secret = 'secretPassword';

const authToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const payload = jwt.verify(token, secret);
    req.payload = payload;

    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  authToken,
};
