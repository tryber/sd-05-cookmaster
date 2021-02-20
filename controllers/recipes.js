const { Router } = require('express');
const { verifyToken } = require('../midlewares/jwt');
const recipesServices = require('../services/recipes');

const recipesRouter = Router();

recipesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.getRecipe(id);
    console.log(recipe, 'recipes');
    return res.status(200).json(recipe);
  } catch (error) {
    return res
      .status(404)
      .json({ message: 'recipe not found' });
  }
});

recipesRouter.get('/', async (_req, res) => {
  try {
    const recipes = await recipesServices.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Estamos fora do ar. Tente novamente mais tarde' });
  }
});

recipesRouter.post('/', verifyToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.payload;
  try {
    const recipe = await recipesServices.insertNewRecipe(
      name,
      ingredients,
      preparation,
      userId
    );
    return res.status(201).json(recipe);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
});

module.exports = recipesRouter;
