const editRecipe = require('../models/editRecipe');

const editRecipeService = async (id, name, ingredients, preparation) =>
  editRecipe(id, name, ingredients, preparation);

module.exports = editRecipeService;
