const { Router } = require('express');

const recipeModel = require('../model/recipeModel');
const { checkRecipeForm, checkRecipeId } = require('../service/recipeService');
const { verifyJWT } = require('../middleware/authorization');
const upload = require('../service/imageService');

const recipeRoute = Router();

// foi / teste ok
recipeRoute.post(
  '/', checkRecipeForm, verifyJWT,
  async (req, res) => {
    const { _id } = req.payload;
    const { name, ingredients, preparation } = req.body;
    const userId = _id;
    const recipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
    if (!recipe) return res.status(400).json({ message: 'Something went wrong. Try again.' });
    console.log('linha 19', recipe.name);
    res.status(201).json({ recipe });
  },
);

// foi /
recipeRoute.get(
  '/', async (_req, res) => {
    const recipes = await recipeModel.getAllRecipes();
    if (recipes.err) return res.status(404).json({ message: 'Something went wrong. Try again.' });
    res.status(200).json(recipes);
  },
);

// foi
recipeRoute.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeModel.getRecipeById(id);
    if (!recipe) return res.status(404).json({ message: 'recipe not found' });
    return res.status(200).json(recipe);
  },
);

recipeRoute.put(
  '/:id', verifyJWT, checkRecipeId,
  async (req, res) => {
    const { id } = req.params;
    const { _id, role } = req.payload;
    console.log(_id);
    const userId = _id;
    const { name, ingredients, preparation } = req.body;
    console.log('linha 50', req.body);
    if (userId !== req.user) {
      if (role !== 'admin') {
        return res.status(401).json({ message: 'You cant edit this recipe.' });
      }
    }
    const editedRecipe = await recipeModel.updateRecipe(name, ingredients, preparation, userId);
    if (editedRecipe === 0) return { message: 'Erroooou' };
    return res.status(200).json({ id, userId, name, ingredients, preparation });
  },
);

recipeRoute.delete(
  '/:id', verifyJWT,
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.payload;
    console.log(req.payload);
    const recipe = await recipeModel.getRecipeById(id);
    if (role === 'admin' || _id === recipe.userId) {
      await recipeModel.deleteRecipe(_id);
      return res.status(204).json();
    }
    return res.status(401).json({ message: 'You cant deletee this recipe.' });
  },
);

recipeRoute.put(
  '/:id/image/',
  verifyJWT,
  upload.single('image'), // multer é um middleware
  async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await recipeModel.getRecipeById(id);

      const destination = `localhost:3000/images/${id}.jpeg`;

      await recipeModel.uploadImage(id, destination);

      const updatedRecipe = { ...recipe, image: destination };
      res.status(200).json(updatedRecipe);
    } catch (err) {
      res.status(501).json({
        message: 'Failed to upload image',
      });
    }
  },
);

module.exports = recipeRoute;
