// const { ObjectId } = require('mongodb');
const usersModel = require('../models/usersModel');
const throwError = require('../utils/throwError');

const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const createUser = async (name, email, password) => {
  if (!name || !email || !password || !regexEmail.test(email)) return throwError(400, 'Invalid entries. Try again.');

  const findIfUserAlreadyExists = await usersModel.getUserByEmail(email);

  if (findIfUserAlreadyExists) return throwError(409, 'Email already registered');

  return usersModel.createUser(name, email, password);
};

const login = async (email, password) => {
  if (!email || !password) return throwError(401, 'All fields must be filled');

  const user = await usersModel.getUserByEmail(email);

  if (!user || user.password !== password) return throwError(401, 'Incorrect username or password');

  return user;
};

module.exports = {
  createUser,
  login,
};
