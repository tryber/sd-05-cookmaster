const userModel = require('../models/usersModel');
// const userAuthenticate = require('./userAuthenticate');

const loginAuthenticate = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined || password === undefined) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const findEmail = await userModel.verifyEmail(email);
  if (!findEmail) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  if (findEmail.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = { loginAuthenticate };
