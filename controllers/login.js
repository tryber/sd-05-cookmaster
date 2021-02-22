const { Router } = require('express');
const createToken = require('../middleWare/jwt');
const loginService = require('../services/login');

const loginRouter = Router();
loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogin = await loginService.login(email, password);
    const token = createToken(userLogin);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

module.exports = loginRouter;
