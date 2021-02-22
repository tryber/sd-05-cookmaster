const { Router } = require('express');
const multer = require('multer');
const { validateToken } = require('../middleWare/jwtValidate');
const recipeService = require('../services/recipes');

const recipeRouter = Router();
recipeRouter.post('/', validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.payload;
  try {
    const newRecipe = await recipeService.recipes(name, ingredients, preparation, userId);
    return res.status(201).json(newRecipe);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

recipeRouter.get('/', async (_req, res) => {
  const nottoday = await recipeService.getRecipes();
  return res.status(200).json(nottoday);
});

recipeRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ids = await recipeService.getRecipeById(id);
    return res.status(200).json(ids);
  } catch (error) {
    return res.status(404).json({ message: 'recipe not found' });
  }
});

recipeRouter.put('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { payload } = req;
  try {
    const updatedRecipe = await recipeService.updateRecipes(
      id,
      name,
      ingredients,
      preparation,
      payload,
    );
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

recipeRouter.delete('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await recipeService.deleteRecipe(id);
    return res.status(204).json({ message: 'Recipe deleted.' });
  } catch (error) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const uploadDoInferno = multer({ storage });

recipeRouter.put('/:id/image', validateToken, uploadDoInferno.single('image'), async (req, res) => {
  const { id } = req.params;
  const { payload } = req;
  const path = `localhost:3000/images/${req.file.filename}`;
  try {
    const ibagen = await recipeService.updateImage(id, payload, path);
    return res.status(200).json(ibagen);
  } catch (error) {
    return res.status(400).json({ message: 'num guento mais' });
  }
});

module.exports = recipeRouter;
