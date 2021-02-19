const deleteRecipe = require('../models/deleteRecipe');

const deleteRecipeService = async (id) =>
  deleteRecipe(id);

module.exports = deleteRecipeService;
