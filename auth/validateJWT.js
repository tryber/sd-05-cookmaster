const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const secret = 'lyumbinka';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await UserModel.findByEmail(decoded.userWithoutPassword.email);

    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = decoded.userWithoutPassword;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
