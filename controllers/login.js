const { Router } = require('express');
const loginServices = require('../services/login');

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const login = await loginServices.login(email, password);
    return res.status(200).json(login);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
});

module.exports = loginRouter;
