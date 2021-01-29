const { ObjectId } = require('mongodb');
const recipesModel = require('../model/recipeModel');
const userModel = require('../model/userModel');

const errorMessage = (message, code) => ({ err: { message, code } });

const insertRecipe = async (name, ingredients, preparation, email) => {
  if (!name || !ingredients || !preparation) return errorMessage('All fields must be filled', 'invali_data');
  const userData = await userModel.findByEmail(email);
  if (!userData) return errorMessage('Invalid user', 'invalid_user');
  const recipeUser = await recipesModel.insertRecipe(name, ingredients, preparation);
  const { _id: idUser } = userData;
  recipeUser.userId = idUser;
  return recipeUser;
};

const getAllRecipes = async () => recipesModel.findAllRecipes();

const getRecipeById = async (id) => recipesModel.findById(id);

const updateRecipe = async (id, name, ingredients, preparation) => {
  await recipesModel.updateRecipe(id, name, ingredients, preparation);
  const recipe = recipesModel.findById(id);
  return recipe;
};

const deleteRecipe = async (id, email) => {
  if (!ObjectId.isValid(id)) return errorMessage('No matches', 'invalid_data');
  const recipe = recipesModel.findById(id);
  if (!recipe) return errorMessage('No matches', 'invalid_data');
  const user = await userModel.findByEmail(email)
  const { _is: idUser } = user;
  if (recipe.user.id === idUser) {
    return recipesModel.deleteRecipe(id);
  }
  if (user.role === 'admin') return recipesModel.deleteRecipe(id);
  return null;
};

module.exports = { insertRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
