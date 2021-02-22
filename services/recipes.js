const recipeModel = require('../models/recipes');
// const { loginSchema } = require('../utils/verify');

const recipes = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    const error = {};
    error.status = 400;
    error.message = 'Invalid entries. Try again.';
    throw error;
  }

  const result = await recipeModel.newRecipes(name, ingredients, preparation, userId);
  return result;
};
const getRecipeById = async (id) => recipeModel.getRecipesId(id);

const getRecipes = async () => recipeModel.getRecipes();

const updateRecipes = async (id, name, ingredients, preparation, payload) => {
  const { userId, role } = payload;
  const recipe = recipeModel.getRecipesId(id);

  if (recipe.userId !== userId && role !== 'admin') {
    const error = {};
    error.status = 400;
    error.message = 'Invalid entries. Try again.';
    throw error;
  }

  const updated = await recipeModel.updateRecipes(id, name, ingredients, preparation);
  return updated;
};

const updateImage = async (id, payload, image) => {
  const { _id: userId, role } = payload;
  const recipe = await recipeModel.getRecipesId(id);
  console.log(recipe);

  if (recipe.userId !== userId && role !== 'admin') {
    const error = {};
    error.status = 400;
    error.message = 'Invalid entries. Try again.';
    throw error;
  }
  const { name, ingredients, preparation } = recipe;
  const recipez = await recipeModel.updateRecipes(id, name, ingredients, preparation, image);
  return recipez;
};

const deleteRecipe = async (id) => {
  const a = await recipeModel.deleteRecipe(id);
  return a;
};

module.exports = { recipes, getRecipes, getRecipeById, updateRecipes, deleteRecipe, updateImage };
