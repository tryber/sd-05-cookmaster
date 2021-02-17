const userModel = require('../model/userModel');

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const errorMessage = (message) => ({ message });

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailExists = await userModel.getUserMail(email);
  console.log(emailExists);
  if (!name || !email || !password) return res.status(401).json(errorMessage('Invalid entries. Try again.'));
  if (!emailRegex.test(email)) return res.status(401).json(errorMessage('Incorrect username or password'));
  if (emailExists !== null) return res.status(409).json(errorMessage('Email already registered'));
  next();
};

module.exports = { validateUser };
