const { Router } = require('express');
const { createToken } = require('../midlewares/jwt');
const loginServices = require('../services/login');

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginServices.login(email, password);
    const token = createToken(user);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
});

module.exports = loginRouter;
