const multer = require('multer');

const { Router } = require('express');

const rescue = require('express-rescue');

const recipes = Router();

const { getById, update } = require('../models/recipesModel');

const recipesService = require('../service/recipesService');

const auth = require('../middlewares/auth');

recipes.get('/', async (_req, res) => {
  const getAll = await recipesService.getAll();
  return res.status(200).json(getAll);
});

recipes.post('/', auth, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id: userId } = req.user;
    const newRecipe = await recipesService.create(
      name,
      ingredients,
      preparation,
      userId,
    );

    if (newRecipe.error) {
      return res
        .status(newRecipe.statusCode)
        .json({ message: newRecipe.message });
    }
    res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

recipes.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    const updateRecipe = await recipesService.update(
      id,
      name,
      ingredients,
      preparation,
      userId,
    );
    if (updateRecipe.error) {
      return res
        .status(updateRecipe.statusCode)
        .json({ message: updateRecipe.message });
    }
    return res.status(200).json(updateRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

recipes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getById(id);
    if (recipe.error) {
      return res.status(recipe.statusCode).json({ message: recipe.message });
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

recipes.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecipe = await recipesService.remove(id);
    if (!auth) return res.status(401).json({ message: 'missing auth token' });
    res.status(204).json(deleteRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
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

const upload = multer({ storage });

recipes.put(
  '/:id/image',
  auth,
  upload.single('image'),
  rescue(async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    console.log('req.params ===>', req.params);
    console.log('req.user ===>', userId);
    const recipe = await getById(id);
    console.log('recipe ===>', recipe);
    /* if (req.user._id !== recipe.userId && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'missing auth token' });
    } */
    recipe.image = `localhost:3000/images/${req.file.filename}`;
    console.log('recipe.image ===>', recipe.image);
    const updates = await update(id, recipe, userId);
    return res.status(200).json(updates);
  }),
);

module.exports = recipes;
