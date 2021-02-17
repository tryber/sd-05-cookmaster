/* eslint-disable import/no-unresolved */
const { Router } = require('express');
const userModel = require('../model/userModel');
const userService = require('../service/userService');

const userRoute = Router();

userRoute.post(
  '/', userService.validateUser, async (req, res) => {
    const user = await userModel.createUser(req.body);
    if (user.err) return res.status(400).json('Algo deu errado!');
    res.status(201).json(user);
  },
);

module.exports = userRoute;
