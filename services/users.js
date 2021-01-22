const usersModel = require('../models');

const login = async (userData) => usersModel.login(userData.email, userData.password);
const createUser = async (userData) => usersModel.createUser(userData);

module.exports = { login, createUser };
