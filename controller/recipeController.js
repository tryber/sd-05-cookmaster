const recipeService = require('../service/recipeService');
// const User = require('../service/userService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipeCreated = await recipeService.insertRecipe(name, ingredients, preparation);
  if(!recipeCreated) res.status(400).json({ message: 'Dados inválidos' });
  res.status(200).json({ recipeCreated });
};

const showAllRecipes = async (req, res) => {
  const allRecipes = await recipeService.getAllRecipes();
  if (!allRecipes) res.status(400).json({ message: 'Didnt work pall'});
  res.status(200).json({ allRecipes });
};

// const currentRecipe = async (req, res) => {
//   const { user } = req;
//   const recipe = await recipeService.getRecipeById(req.params.id);
//   const isRecipeCreator = !!user && user.id === recipe.userId;

module.exports = {
  createRecipe,
  showAllRecipes,
};
