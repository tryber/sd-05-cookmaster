const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const errorMessage = (message) => ({ message });

// payload, secret, header
const signature = 'weeee';

const header = { expiresIn: '8h', algorithm: 'HS256' };

const createToken = async (userEmail) => {
  const currentUser = await userModel.getUserMail(userEmail);
  if (currentUser.err) throw errorMessage;
  const { _id, email, role } = currentUser;
  const payload = { _id, email, role };
  const token = jwt.sign(payload, signature, header);
  console.log(token);
  return token;
};

// const token = jwt.sign({ payload, role: user.role }, signature, { header });

const verifyJWT = (required = true) => (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth && !required) return next();
    if (!auth) return res.status(400).json(errorMessage('Missing auth token'));
    jwt.verify(auth, signature);
    const decoded = jwt.decode(auth);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(errorMessage('jwt malformed'));
  }
};

module.exports = { createToken, verifyJWT };
