const { Router } = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const validateJWT = require('../auth/validateJWT');
const recipeService = require('../services/RecipeService');

// Router é agrupador de middlewares
const recipeRouter = Router();

/*  ********************************************************************************************* */
recipeRouter.post('/', validateJWT, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const recipe = await recipeService.Validation(name, ingredients, preparation, userId);
  res.status(201).json(recipe);
}));

recipeRouter.get('/', rescue(async (req, res) => {
  const recipes = await recipeService.getAll();
  res.status(200).json(recipes);
}));

recipeRouter.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const recipes = await recipeService.getById(id);
  res.status(200).json(recipes);
}));

recipeRouter.put('/:id', validateJWT, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const recipes = await recipeService.update(id, name, ingredients, preparation, userId);
  res.status(200).json(recipes);
}));

recipeRouter.delete('/:id', validateJWT, rescue(async (req, res) => {
  const { id } = req.params;
  await recipeService.removeById(id);
  return res.status(204).json({ message: 'deleted' });
}));

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => callback(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage });

recipeRouter.put('/:id/image', validateJWT, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.saveImage(id);
  return res.status(200).json(recipe);
});

module.exports = recipeRouter;
