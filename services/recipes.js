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
  const recipe = await modelRecipes.insertNewRecipe(name, ingredients, preparation, userId);
  console.log(recipe);
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

module.exports = { insertNewRecipe, getAllRecipes, getRecipe };
