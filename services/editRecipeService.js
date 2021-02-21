const editRecipe = require('../models/editRecipe');

const editRecipeService = async (recipeResponse) =>
  editRecipe(recipeResponse);

module.exports = editRecipeService;
