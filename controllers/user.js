const { Router } = require('express');
const service = require('../services/users');

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await service.createNewUser(name, email, password);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

module.exports = userRouter;
