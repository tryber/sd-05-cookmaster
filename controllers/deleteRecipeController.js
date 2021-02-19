const deleteRecipeService = require('../services/deleteRecipeService');

const deleteRecipeController = async (req, res) => {
  const { id } = req.params;

  await deleteRecipeService(id);

  return res.status(204).json();
};

module.exports = deleteRecipeController;
