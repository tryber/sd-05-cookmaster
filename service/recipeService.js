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

const editRecipe = async () => recipesModel.updateRecipe();

const deleteRecipe = async (id) => recipesModel.deleteRecipe(id);

module.exports = { insertRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
