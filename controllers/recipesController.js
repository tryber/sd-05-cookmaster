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

recipesRouter.put('/recipes/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.userData;
  const editRecipe = await recipesService.editRecipe(id, name, ingredients, preparation);

  if (editRecipe.error) {
    return res.status(editRecipe.error.code).json({ message: editRecipe.error.message });
  }

  res.status(200).json({ _id: id, userId, name, ingredients, preparation });
}));

recipesRouter.delete('/recipes/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;
  const { role, _id: userId } = req.userData;

  const deleteRecipe = await recipesService.deleteRecipe(id, role, userId);

  if (deleteRecipe.error) {
    return res.status(deleteRecipe.error.code).json({ message: deleteRecipe.error.message });
  }

  res.status(204).json();
}));

module.exports = recipesRouter;
