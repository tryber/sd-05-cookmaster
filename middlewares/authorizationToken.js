const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const authorizationToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decode = await jwt.verify(authorization, 'tumpero');
    const verifyUser = await userModel.verifyEmail(decode.data.email);
    if (verifyUser === null) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
  next();
};

module.exports = { authorizationToken };
