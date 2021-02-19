const jwt = require('jsonwebtoken');
const model = require('../model/UserModel');

const senha = 'senhaSecreta';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, senha, {
      audience: 'identity',
      issuer: 'post-api',
    });

    const user = await model.emailModel(payload.userData.email);

    if (!user) throw new Error({ code: 'invalid_user', message: 'Invalid entries. Try again.' });

    const { password, ...newPassword } = user;

    req.user = newPassword;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
