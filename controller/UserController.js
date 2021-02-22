const { Router } = require('express');
// const rescue = require('express-rescue');
const createUserService = require('../service/UserService');
const authToken = require('../middleware/authentication');
const { createUserModel } = require('../model/UserModel');

const rota = Router();

rota.post('/', createUserService, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUserModel(name, email, password);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

rota.post('/admin', createUserService, authToken, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (req.payload.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }
    const user = await createUserModel(name, email, password, 'admin');
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = rota;
