const jwt = require('jsonwebtoken');

// payload, secret, header

const signature = 'master of puppets';
const header = { expiresIn: '8h', algorithm: 'HS256' };

// const token = jwt.sign({ payload, role: user.role }, signature, { header });

const verifyJWT = (req, res, next) => {
	const auth = req.headers.Authorization;
	if (!auth) return res.status(400).json('Missing token');
  jwt.verify(token, signature, (err, decoded) => {
		if (err) return res.status(401).end();
		req.user = decoded.user
	});
	  next();
  });
};

module.exports = verifyJWT;
