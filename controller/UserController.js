const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../service/UserService');

const rota = Router();

rota.post(
  '/',
  rescue(async (req, res, next) => {
    const createNewUser = await service.createUserService(req.body);

    if (createNewUser.error) {
      return next(createNewUser);
    }
    return res.status(201).json({ user: createNewUser });
  });
);

module.exports = rota;
