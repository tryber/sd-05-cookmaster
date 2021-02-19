const getRecipesService = require('../services/getRecipesService');

const getRecipesController = async (_req, res) => {
  const response = await getRecipesService();
  res.status(200).send(response);
};

module.exports = getRecipesController;
