const { Router } = require('express');
const middlewares = require('../middlewares');

const loginRouter = Router();

loginRouter.post('/', middlewares.validateFields, middlewares.createToken, async (req, res) => (
  res.status(200).json({ token: req.headers.authorization })
));

module.exports = loginRouter;
