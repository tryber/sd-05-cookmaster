const userModel = require('../model/userModel');

const errorMessage = (message) => ({ message });

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.getUserMail(email);
  if (!email || !password) return res.status(401).json(errorMessage('All fields must be filled'));
  if (!user) return res.status(401).json(errorMessage('Incorrect username or password'));
  if (password !== user.password) return res.status(401).json(errorMessage('Incorrect username or password'));

  next();
};

module.exports = { validateLogin };
