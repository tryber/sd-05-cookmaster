const recipesModel = require('../models');

const createRecipe = async (recipeData) => recipesModel.createRecipe(recipeData);
const listRecipes = async (recipeId) => recipesModel.listRecipes(recipeId);
const deleteRecipe = async (recipeId) => recipesModel.deleteRecipe(recipeId);
const editRecipe = async (recipeData, recipeId) => recipesModel.editRecipe(recipeData, recipeId);
const editRecipeImage = async (recipeId) => recipesModel.editRecipeImage(recipeId);

module.exports = {
  listRecipes,
  createRecipe,
  editRecipe,
  deleteRecipe,
  editRecipeImage,
};
