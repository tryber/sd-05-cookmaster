const rescue = require('express-rescue');
const { Router } = require('express');
const LoginService = require('../services/LoginService');

const loginRouter = Router();

/*  ********************************************************************************************* */
loginRouter.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await LoginService.getUser(email, password);
  res.status(200).json({ token });
}));

module.exports = loginRouter;
