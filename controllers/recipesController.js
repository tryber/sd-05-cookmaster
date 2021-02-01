const { ObjectID } = require('mongodb');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { createRecipes, getAllRecipes, getRecipeById } = require('../models');
const checkSRecipe = require('../middlewares/receipesMiddleware');

const recipesRouter = Router();

recipesRouter.post('/', checkSRecipe, async (req, res) => {
  try {
    const secret = 'secretPassword';
    const token = req.headers.authorization;
    const tokenValidation = jwt.verify(token, secret);
    // const user = await verifyEmail(tokenValidation.userData.email);

    const { name, ingredients, preparation, userId } = req.body;
    // const { _id: userId } = req.user;

    const recipe = await createRecipes({ name, ingredients, preparation, userId });
    // console.log(recipe)
    if (tokenValidation) {
      return res.status(201).json(recipe);
    }

    if (!token) {
      return res.status(401).json({
        message: 'missing auth token',
      });
    }
  } catch (error) {
    // console.log(error)
    res.status(401).json({ message: 'jwt malformed' });
  }
});

recipesRouter.get('/', async (_req, res) => {
  const allRecipes = await getAllRecipes();

  return res.status(200).json(allRecipes);
});

recipesRouter.get('/:id', async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  const recipeById = await getRecipeById(req.params.id);

  if (!recipeById) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  return res.status(200).json(recipeById);
});

module.exports = recipesRouter;
