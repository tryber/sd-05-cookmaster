const { Router } = require('express');
const rescue = require('express-rescue');
const recipesService = require('../services/recipesService');
const validateToken = require('../utils/validateToken');

const recipesRouter = Router();

recipesRouter.post('/recipes', validateToken, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.userData;

  const recipe = await recipesService.createRecipe(name, ingredients, preparation, userId);

  if (recipe.error) {
    return res.status(recipe.error.code).json({ message: recipe.error.message });
  }

  res.status(201).json({ recipe });
}));

recipesRouter.get('/recipes', rescue(async (req, res) => {
  const allRecipes = await recipesService.getAllRecipes();

  res.status(200).json(allRecipes);
}));

recipesRouter.get('/recipes/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getRecipeById(id);

  if (recipe.error) {
    return res.status(recipe.error.code).json({ message: recipe.error.message });
  }

  res.status(200).json(recipe);
}));

module.exports = recipesRouter;
