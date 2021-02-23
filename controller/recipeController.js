const { ObjectID } = require('mongodb');
const { Router } = require('express');
const multer = require('multer');
const {
  createRecipeModel,
  showRecipeModel,
  showByIdModel,
  updateModel,
  deleteRecipeModel,
} = require('../model/recipeModel');
const { createRecipeService } = require('../service/recipeService');
const authToken = require('../middleware/authentication');

const recipeRouter = Router();

recipeRouter.post('/', authToken, createRecipeService, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.payload.user;
    const newRecipe = await createRecipeModel({ name, ingredients, preparation, userId });

    if (newRecipe) {
      return res.status(201).json(newRecipe);
    }
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
});

recipeRouter.get('/', async (_req, res) => {
  const showRecipe = await showRecipeModel();

  return res.status(200).json(showRecipe);
});

recipeRouter.get('/:id', async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  const showRecipeId = await showByIdModel(req.params.id);

  if (!showRecipeId) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  return res.status(200).json(showRecipeId);
});

recipeRouter.put('/:id', authToken, async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const { id } = req.params;
    const payload = { name, ingredients, preparation };
    const changedRecipe = await updateModel(id, payload, userId);
    return res.status(200).json(changedRecipe);
  } catch (error) {
    res.status(500).json({ message: console.log(error) });
  }
});

recipeRouter.delete('/:id', authToken, async (req, res) => {
  try {
    const recipeById = await showByIdModel(req.params.id);
    if (!recipeById) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    await deleteRecipeModel(req.params.id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json(error);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const start = file.mimetype.indexOf('/');
    const extensao = file.mimetype.substring(start + 1);
    callback(null, `${req.params.id}.${extensao}`);
  },
});

const uploadImage = multer({ storage });

recipeRouter.put('/:id/image/', authToken, uploadImage.single('image'), async (req, res) => {
  try {
    const recipeById = await showByIdModel(req.params.id);
    const { _id: id, userId } = recipeById;
    const { _id: payloadId, role } = req.payload.user;
    if (payloadId !== recipeById.userId && role !== 'admin') {
      return res.status(401).json({ message: 'missing auth token' });
    }
    recipeById.image = `localhost:3000/images/${req.file.filename}`;
    const editedRecipe = await updateModel(id, recipeById, userId);
    return res.status(200).json(editedRecipe);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = recipeRouter;
