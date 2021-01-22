const { Router } = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const middlewares = require('../middlewares');
const { recipesService } = require('../services');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => callback(null, `${req.params.id}.jpeg`),
});
const upload = multer({ storage });

const recipesRouter = Router();

recipesRouter.get('/', async (req, res) => {
  const allRecipes = await recipesService.listRecipes();
  return res.status(200).json(allRecipes);
});

recipesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    const recipe = await recipesService.listRecipes(id);
    return res.status(200).json(recipe);
  }
  return res.status(404).json({ message: 'recipe not found' });
});

recipesRouter.post('/', middlewares.auth, middlewares.validateFields, async (req, res) => {
  const recipeData = req.body;
  const recipe = await recipesService.createRecipe(recipeData);
  return res.status(201).json(recipe);
});

recipesRouter.put('/:id', middlewares.auth, middlewares.validateFields, async (req, res) => {
  const { body, params: { id } } = req;
  if (ObjectId.isValid(id)) {
    const recipe = await recipesService.editRecipe(body, id);
    return recipe
      ? res.status(200).json(recipe)
      : res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(404).json({ message: 'recipe not found' });
});

recipesRouter.put('/:id/image', middlewares.auth, upload.single('image'), async (req, res) => {
  const recipe = await recipesService.editRecipeImage(req);
  return res.status(200).json(recipe);
});

recipesRouter.delete('/:id', middlewares.auth, async (req, res) => {
  const { params: { id } } = req;
  if (ObjectId.isValid(id)) {
    await recipesService.deleteRecipe(id);
    return res.status(204).json({ message: 'recipe deleted' });
  }
  return res.status(404).json({ message: 'recipe not found' });
});
module.exports = recipesRouter;
