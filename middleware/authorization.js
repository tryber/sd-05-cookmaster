const jwt = require('jsonwebtoken');

// payload, secret, header
const signature = 'master of puppets';

const createToken = (user) => {
  const header = { expiresIn: '8h', algorithm: 'HS256' };
  const { password, ...userData } = user;
  const payload = userData;
  const token = jwt.sign(payload, signature, header);
  return token;
};

// const token = jwt.sign({ payload, role: user.role }, signature, { header });

const verifyJWT = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(400).json('Missing token');
    jwt.verify(auth, signature);
    const decoded = jwt.decode(auth);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).res({ 'err.message': 'jwt malformed' });
  }
};

module.exports = { createToken, verifyJWT };
