const connection = require('./connection');
const { createUser, login } = require('./users');
const { createRecipe, listRecipes, editRecipe, deleteRecipe, editRecipeImage } = require('./recipes');

module.exports = {
  login,
  connection,
  // CRUD below
  createUser,
  createRecipe,
  editRecipe,
  editRecipeImage,
  listRecipes,
  deleteRecipe,
};
