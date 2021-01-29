const { Router } = require('express');
const { verifyJWT } = require('../middleware/authorization');
const recipeService = require('../service/recipeService');

const recipeRoute = Router();

recipeRoute.post(
  '/', verifyJWT,
  async (req, res) => {
    const { user } = req;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipeService.insertRecipe(name, ingredients, preparation, user.email);
    if (!recipe) return res.status(400).json({ message: 'Dados inválidos' });
    res.status(201).json({ recipe });
  },
);

recipeRoute.get(
  '/', async (_req, res) => {
    const recipes = await recipeService.getAllRecipes();
    if (!recipes) res.status(400).json({ message: 'Didnt work pall' });
    res.status(200).json({ recipes });
  },
);

recipeRoute.get(
  '/:id', async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) res.status(400).json({ message: 'No recipe' });
    res.status(200).json({ recipe });
  },
);

recipeRoute.put(
  '/:id', async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipeService.updateRecipe(id, name, ingredients, preparation);
    if (!recipe) res.status(400).json({ message: 'No recipe' });
    res.status(200).json({ recipe });
  },
);

recipeRoute.delete(
  '/:id', async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.deleteRecipe(id);
    if (!recipe) res.status(400).json({ message: 'No recipe to delete' });
    res.status(200).json({ recipe });
  },
);

module.exports = recipeRoute;
