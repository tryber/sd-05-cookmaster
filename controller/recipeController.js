const { Router } = require('express');

const recipeModel = require('../model/recipeModel');
const { checkRecipeForm, checkRecipeId } = require('../service/recipeService');
const { verifyJWT } = require('../middleware/authorization');
const upload = require('../service/imageService');

const recipeRoute = Router();

recipeRoute.post(
  '/', checkRecipeForm, verifyJWT,
  async (req, res) => {
    const { _id } = req.payload;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipeModel.createRecipe({ name, ingredients, preparation, userId: _id });
    if (!recipe) return res.status(400).json({ message: 'Something went wrong. Try again.' });
    res.status(201).json({ recipe });
  },
);

// foi
recipeRoute.get(
  '/', async (_req, res) => {
    const recipes = await recipeModel.getAllRecipes();
    if (recipes.err) return res.status(400).json({ message: 'Something went wrong. Try again.' });
    res.status(200).json({ recipes });
  },
);

// foi
recipeRoute.get(
  '/:id', verifyJWT,
  async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeModel.getRecipeById(id);
    if (!recipe) return res.status(400).json({ message: 'Something went wrong. Try again.' });
    return res.status(200).json(recipe);
  },
);

recipeRoute.put(
  '/:id', checkRecipeId, verifyJWT,
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.user;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipeModel.getRecipeById(id);
    if (role === 'admin' || _id === recipe.userId) {
      await recipeModel.updateRecipe(id, name, ingredients, preparation);
      const editedRecipe = await recipeModel.getRecipeById(id);
      if (!editedRecipe) return res.status(401).json({ message: 'You cant edit this recipe.' });
      return res.status(200).json(editedRecipe);
    }
  },
);

recipeRoute.delete(
  '/:id', verifyJWT,
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.user;
    console.log(req.user);
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
  verifyJWT,
  checkRecipeForm,
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
