const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secretKey = '9c4e93c0efb98664abc16c3020bf697946b5c7fd18a2dd0f29a798de2d7b3688';

const validateEmailRegex = (email) => {
  const emailRegex = new RegExp(/^[a-z0-9.]+@[a-z]+.[a-z]+(.[a-z]+)?$/i);
  return emailRegex.test(email);
};

const newUserValidate = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ message: 'Invalid entries. Try again.' });

  if (!validateEmailRegex(email)) return res.status(400).json({ message: 'Invalid entries. Try again.' });

  const foundUser = await userModel.find({ email });

  if (foundUser !== null) return res.status(409).json({ message: 'Email already registered' });
  console.log('next');
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

  if (!validateEmailRegex(email)) return res.status(401).json({ message: 'Incorrect username or password' });

  next();
};

const validateNewRecipe = async (req, res, next) => {
  const { name, preparation, ingredients } = req.body;

  if (!name || !preparation || !ingredients) return res.status(400).json({ message: 'Invalid entries. Try again.' });

  jwt.verify(req.headers.authorization, secretKey, async (error, decodedObject) => {
    if (error !== null) return res.status(401).json({ message: 'jwt malformed' });

    const user = await userModel.find({ email: decodedObject.email });

    if (user == null) return res.status(401).json({ message: 'jwt malformed' });

    next();
  });
};

const validateBeforeGetRecipe = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    jwt.verify(req.headers.authorization, secretKey);
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  next();
};

const validateBeforeUpdateRecipe = (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) return res.status(401).json({ message: 'missing auth token' });

  jwt.verify(accessToken, secretKey, (error, decodedObject) => {
    if (error !== null) return res.status(401).json({ message: 'jwt malformed' });

    req.loggedUser = decodedObject;

    next();
  });
};

module.exports = {
  newUserValidate,
  validateLogin,
  validateNewRecipe,
  validateBeforeGetRecipe,
  validateBeforeUpdateRecipe,
};
