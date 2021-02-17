const createUserService = require('../services/createUserService');

const createUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const response = await createUserService(name, email, password);
  console.log(response);
  res.status(201).json({ user: response });
};

module.exports = createUserController;
