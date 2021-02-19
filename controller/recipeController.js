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
    console.log('linha 17', ({ recipe }));
    if (!recipe) return res.status(400).json({ message: 'Something went wrong. Try again.' });
    res.status(201).json({ recipe });
  },
);

// foi /
recipeRoute.get(
  '/', async (_req, res) => {
    const recipes = await recipeModel.getAllRecipes();
    if (recipes.err) return res.status(404).json({ message: 'Something went wrong. Try again.' });
    console.log('linha 28', recipes[0].preparation);
    res.status(200).json(recipes);
  },
);

// foi
recipeRoute.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeModel.getRecipeById(id);
    console.log(recipe);
    if (!recipe) return res.status(404).json({ message: 'recipe not found' });
    return res.status(200).json(recipe);
  },
);

recipeRoute.put(
  '/:id', checkRecipeId, verifyJWT,
  async (req, res) => {
    const { _id, role } = req.payload;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipeModel.getRecipeById(_id);
    if (role === 'admin' || _id === recipe.userId) {
      await recipeModel.updateRecipe(_id, name, ingredients, preparation);
      const editedRecipe = await recipeModel.getRecipeById(_id);
      if (!editedRecipe) return res.status(401).json({ message: 'You cant edit this recipe.' });
      return res.status(200).json(editedRecipe);
    }
  },
);

recipeRoute.delete(
  '/:id', verifyJWT,
  async (req, res) => {
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
  checkRecipeForm,
  upload.single('image'), // multer é um middleware
  async (req, res) => {
    try {
      const { _id } = req.payload;
      const recipe = await recipeModel.getRecipeById(_id);

      const destination = `localhost:3000/images/${_id}.jpeg`;

      await recipeModel.uploadImage(_id, destination);

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
