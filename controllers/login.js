const { Router } = require('express');
const middlewares = require('../middlewares');

const loginRouter = Router();

loginRouter.post('/', middlewares.validateFields, middlewares.createToken, async (req, res) => {
  const token = req.headers.authorization;
  return token
    ? res.status(200).json({ token })
    : res.status(401).json({ message: 'Incorrect username or password' });
});

module.exports = loginRouter;
