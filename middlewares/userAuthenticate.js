const userModel = require('../models/usersModel');

// regex fornecido por Lucas Yoshida - @Yoshidalucas92
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userAuthenticate = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (name === undefined || email === undefined || password === undefined) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const validateEmail = regex.test(email);
  if (!validateEmail) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const findEmail = await userModel.verifyEmail(email);
  console.log(findEmail);
  if (findEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

module.exports = { userAuthenticate };
