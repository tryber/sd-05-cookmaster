const modelRecipes = require('../models/recipes');

const insertNewRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    const err = {};
    err.isErr = true;
    err.message = 'Invalid entries. Try again.';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  const recipe = await modelRecipes.insertNewRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );
  return recipe;
};

const updateRecipe = async (recipeParams, payload) => {
  const { name, ingredients, preparation, recipeId } = recipeParams;
  const { _id: userId, role } = payload;
  const recipeById = await modelRecipes.getRecipe(recipeId);
  if (userId !== recipeById.userId && role !== 'admin') {
    const err = {};
    err.isErr = true;
    err.message = 'Invalid entries. Try again.';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  const recipe = await modelRecipes.updateRecipe(
    name,
    ingredients,
    preparation,
    recipeId,
    recipeById.image,
  );
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await modelRecipes.getAllRecipes();
  return recipes;
};

const getRecipe = async (id) => {
  const recipe = await modelRecipes.getRecipe(id);
  return recipe;
};

const deleteRecipe = async (id) => modelRecipes.getRecipe(id);

const uploadPhoto = async (recipeId, payload, imagePath) => {
  const { _id: userId, role } = payload;
  const recipeById = await modelRecipes.getRecipe(recipeId);
  if (userId !== recipeById.userId && role !== 'admin') {
    const err = {};
    err.isErr = true;
    err.message = 'Invalid entries. Try again.';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  const { name, ingredients, preparation } = recipeById;
  const recipe = await modelRecipes.updateRecipe(
    name,
    ingredients,
    preparation,
    recipeId,
    imagePath,
  );
  return recipe;
};

module.exports = {
  insertNewRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  uploadPhoto,
};
