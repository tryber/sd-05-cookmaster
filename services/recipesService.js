const recipesModel = require('../models/recipesModel');
const throwError = require('../utils/throwError');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return throwError(400, 'Invalid entries. Try again.');

  return recipesModel.createRecipe(name, ingredients, preparation, userId);
};

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);

  if (!recipe) return throwError(404, 'recipe not found');

  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await recipesModel.editRecipe(id, name, ingredients, preparation);

  if (!recipe) return throwError(404, 'recipe not found');

  return recipe;
};

const deleteRecipe = async (id, userRole, userId) => {
  if (userRole !== 'admin' && toString(userId) !== toString(id)) {
    return throwError(401, 'user not authenticated or not an admin');
  }

  return recipesModel.deleteRecipe(id);
};

const uploadImage = async (id, userRole, userId) => {
  if (userRole !== 'admin' && toString(userId) !== toString(id)) {
    return throwError(401, 'user not authenticated or not an admin');
  }

  return recipesModel.uploadImage(id);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
};
