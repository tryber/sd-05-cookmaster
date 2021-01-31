const { Router } = require('express');
// const { ObjectID } = require('mongodb');
const rescue = require('express-rescue');
const { createRecipes } = require('../models');
const checkSRecipe = require('../middlewares/receipesMiddleware');

const recipesRouter = Router();

recipesRouter.post('/', checkSRecipe, async (req, res) => {
  try {
    const arrayRecipes = req.body;
    const recipe = await createRecipes(arrayRecipes);
  
    return res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = recipesRouter;
