const recipesModel = require('../model/recipeModel');
const userModel = require('../service/userService');

const errorMessage = (message, code) => ({ err: { message, code } });

const getUserByEmail = (email) => userModel.findByEmail(email).then((userData) => userData);

const insertRecipe = async (name, ingredients, preparation, email) => {
  const user = await getUserByEmail(email);
  if (!user) return errorMessage('Must be logged in', 'invalid_data');
  if (!name || !ingredients || !preparation) return errorMessage('All fields must be filled', 'invali_data');
  return recipesModel.insertRecipe(name, ingredients, preparation);
};

const getAllRecipes = async () => recipesModel.findAllRecipes();

const getRecipeById = async (id) => recipesModel.findById(id);

const editRecipe = async () => recipesModel.updateRecipe();

const deleteRecipe = async (id) => recipesModel.deleteRecipe(id);

module.exports = { insertRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
