const recipesModel = require('../model/recipeModel');
const userLog = require('./userService');

const errorMessage = (message, code) => ({ err: { message, code } });

const someUser = async () => userLog.userLogin();

const insertRecipe = async (name, ingredients, preparation) => {
  const { token } = await someUser();
  if (!token) return errorMessage('Must be logged in', 'invali_data');
  if (!name || !ingredients || !preparation) return errorMessage('All fields must be filled', 'invali_data');
  return recipesModel.insertRecipe(name, ingredients, preparation);
};

const getAllRecipes = async () => recipesModel.findAllRecipes();

const getRecipeById = async (id) => recipesModel.findById(id);

const editRecipe = async () => recipesModel.updateRecipe();

const deleteRecipe = async (id) => recipesModel.deleteRecipe(id);

module.exports = { insertRecipe, getAllRecipes, getRecipeById, editRecipe, deleteRecipe };
