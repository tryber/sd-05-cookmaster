const recipesModel = require('../models/recipesModel');
const throwError = require('../utils/throwError');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return throwError(400, 'Invalid entries. Try again.');

  return recipesModel.createRecipe(name, ingredients, preparation, userId);
};

const getAllRecipes = async () => recipesModel.getAllRecipes();

module.exports = {
  createRecipe,
  getAllRecipes,
};
