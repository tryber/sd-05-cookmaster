const { Router } = require('express');
const auth = require('../middleware/authorization');

const recipeService = require('../service/recipeService');

const recipeRoute = Router();

recipeRoute.post(
  '/', auth.verifyJWT, async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const recipeCreated = await recipeService.insertRecipe(name, ingredients, preparation);
    if (!recipeCreated) return res.status(400).json({ message: 'Dados inválidos' });
    res.status(201).json({ recipeCreated });
  },
);

recipeRoute.get(
  '/', async (_req, res) => {
    const allRecipes = await recipeService.getAllRecipes();
    if (!allRecipes) res.status(400).json({ message: 'Didnt work pall'});
    res.status(200).json({ allRecipes });
  },
);

recipeRoute.get(
  '/:id', async (_req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) res.status(400).json({ message: 'No recipe' });
    res.status(200).json({ recipe });
  },
);

recipeRoute.put(
  '/:id', async (_req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.editRecipe(id);
    if (!recipe) res.status(400).json({ message: 'No recipe' });
    res.status(200).json({ recipe });
  },
);

recipeRoute.delete(
  '/:id', async (_req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.deleteRecipe(id);
    if (!recipe) res.status(400).json({ message: 'No recipe to delete' });
    res.status(200).json({ recipe });
  },
);

module.exports = recipeRoute;
