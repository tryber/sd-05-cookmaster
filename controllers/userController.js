const { Router } = require('express');
// const { ObjectID } = require('mongodb');
// const rescue = require('express-rescue');
const { signUp } = require('../models');
const checkSignUp = require('../middlewares/userMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const userRouter = Router();
// const token = require('../middlewares/token');

userRouter.post('/', checkSignUp, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await signUp(name, email, password);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.post('/admin', checkSignUp, tokenMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (req.payload.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }
    const user = await signUp(name, email, password, 'admin');

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = userRouter;
