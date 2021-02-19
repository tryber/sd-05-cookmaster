const recipeModel = require('../model/recipeModel');

const errorMessage = (msg) => ({ message: msg });

const checkRecipeForm = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) return res.status(400).json(errorMessage('Invalid entries. Try again.'));
  next();
};

const checkRecipeId = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) return res.status(404).json(errorMessage('Recipe not found'));
  req.recipe = recipe;
  next();
};

module.exports = {
  checkRecipeForm,
  checkRecipeId,
};
