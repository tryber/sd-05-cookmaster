const jwt = require('jsonwebtoken');
const userToken = require('../service/userService');

// payload, secret, header

const signature = 'master of puppets';
const header = { expiresIn: '8h', algorithm: 'HS256' };

const token = jwt.sign({ id: user.id, role: user.role }, signature, header) {
	console.log(token);
};

const verifyJWT = (req, res, next) => {
  const token = req.headers.Authorization;
  jwt.verify(token, signature, (err, decoded) => {
    if (err) return res.status(401).end();
    req.id = decoded.id;
    next();
  });
};

module.exports = verifyJWT;
// const authMiddleware = (req, res, next) => {
//   const { token } = user;
//   if (!user) return res.status(400).json('You need to log in'); // res. alguma coisa;
//   const { password, ...userData } = user; // tirou a senha por ser dados pessoais
//   req.user = userData;
//   return next();
// };

// const setToken = async (req, res) => {
// 	const user = req.body;
// 	const token = jwt.sign(
//     {
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     }, signature, header,
// 	);
// 	return res.json({ auth:true, token });
// }
