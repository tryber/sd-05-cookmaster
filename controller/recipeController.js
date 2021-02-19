const { Router } = require('express');
const rescue = require('express-rescue');

const service = require('../service/recipeService');

const recipeRouter = Router();

recipeRouter.post(
  '/',
  rescue(async (req, res, next) => {
    const newRecipe = await service.createRecipeService(req);

    if (newRecipe.error) {
      return next(newRecipe);
    }

    return res.status(201).json({ recipe: newRecipe });
  })
);

recipeRouter.get(
  '/',
  rescue(async (_req, res) => {
    const showRecipe = await service.showRecipeService();
    return res.status(200).json(showRecipe);
  })
);

recipeRouter.get('/:id', rescue(async (req, res, next) => {
    const { id } = req.params;
  
    const recipeService = await service.showByIdService(id);
  
    if (recipeService.error) {
      return next(recipeService);
    }
  
    return res.status(200).json(recipeService);
  }));

module.exports = recipeRouter;
