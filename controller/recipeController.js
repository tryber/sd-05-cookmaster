const { Router } = require('express');
const rescue = require('express-rescue');

const service = require('../service/recipeService');

const recipeRouter = Router();

recipeRouter.post('/', rescue(async (req, res, next) => {
  const newRecipe = await service.createRecipeService(req);

  if (newRecipe.error) {
    return next(newRecipe);
  }

  res.status(201).json({ recipe: newRecipe });
}));

module.exports = recipeRouter;