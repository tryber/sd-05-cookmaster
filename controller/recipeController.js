const { Router } = require('express');

const recipeModel = require('../model/recipeModel');
const recipeService = require('../service/recipeService');
const auth = require('../middleware/authorization');
const upload = require('../service/imageService');

const recipeRoute = Router();

recipeRoute.post(
  '/', auth.verifyJWT, recipeService.checkRecipesForm, recipeService.checkIdUser,
  async (req, res) => {
    const { _id } = req.user;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipeModel.createRecipe({ name, ingredients, preparation, userId: _id });
    if (!recipe) return res.status(400).json({ message: 'Something went wrong. Try again.' });
    res.status(201).json({ recipe });
  },
);

recipeRoute.get(
  '/', auth.verifyJWT(false), async (_req, res) => {
    const recipes = await recipeService.getAllRecipes();
    if (recipes.err) return res.status(400).json({ message: 'Something went wrong. Try again.' });
    res.status(200).json({ recipes });
  },
);

recipeRoute.get(
  '/:id', auth.verifyJWT(false), recipeService.checkIdUser, async (req, res) => {
    res.status(200).json(req.recipe);
  },
);

recipeRoute.put(
  '/:id', auth.verifyJWT,
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.user;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipeModel.getRecipeById(id);
    if (role === 'admin' || _id === recipe.userId) {
      await recipeModel.updateRecipe(id, name, ingredients, preparation);
      const editedRecipe = await recipeModel.getRecipeById(id);
      return res.status(200).json(editedRecipe);
    }
    return res.status(401).json({ message: 'You cant edit this recipe.' });
  },
);

recipeRoute.delete(
  '/:id', auth.verifyJWT,
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.user;
    const recipe = await recipeModel.getRecipeById(id);
    if (role === 'admin' || _id === recipe.userId) {
      await recipeModel.deleteRecipe(id);
      return res.status(204).json();
    }
    return res.status(401).json({ message: 'You cant deletee this recipe.' });
  },
);

recipeRoute.put(
  '/:id/image/',
  recipeService.checkRecipesForm,
  auth.verifyJWT,
  upload.single('image'), // multer é um middleware
  async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await recipeModel.getRecipeById(id);

      const destination = `localhost:3000/images/${id}.jpeg`;

      await recipeModel.uploadImage(id, destination);

      const updatedRecipe = { ...recipe, image: destination };
      res.status(200).json(updatedRecipe);
    } catch (_err) {
      res.status(501).json({
        message: 'Failed to upload image',
      });
    }
  },
);

module.exports = recipeRoute;
