const { ObjectID } = require('mongodb');
const { Router } = require('express');
const multer = require('multer');
const {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
} = require('../models');
const checkSRecipe = require('../middlewares/receipesMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const recipesRouter = Router();

recipesRouter.post('/', tokenMiddleware, checkSRecipe, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.payload.user;
    const recipe = await createRecipes({ name, ingredients, preparation, userId });

    if (recipe) {
      return res.status(201).json(recipe);
    }
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
});

recipesRouter.get('/', async (_req, res) => {
  const allRecipes = await getAllRecipes();

  return res.status(200).json(allRecipes);
});

recipesRouter.get('/:id', async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  const recipeById = await getRecipeById(req.params.id);

  if (!recipeById) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  return res.status(200).json(recipeById);
});

recipesRouter.put('/:id', tokenMiddleware, async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const { id } = req.params;
    // const { _id: userId } = req.user;
    const payload = { name, ingredients, preparation };
    const changedRecipe = await editRecipeById(id, payload, userId);
    return res.status(200).json(changedRecipe);
  } catch (error) {
    res.status(500).json({ message: console.log(error) });
  }
});

recipesRouter.delete('/:id', tokenMiddleware, async (req, res) => {
  try {
    const recipeById = await getRecipeById(req.params.id);
    if (!recipeById) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    await deleteRecipe(req.params.id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json(error);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads')
  },
  filename: (req, file, callback) => {
    // console.log('epa file', file.mimetype)
    const start = file.mimetype.indexOf('/');
    const extensao = file.mimetype.substring(start + 1);
    callback(null, req.params.id + '.' + extensao);
  }
});

const uploadImage = multer({ storage });

recipesRouter.put('/:id/image/', tokenMiddleware, uploadImage.single('image'), async (req, res) => {
  try {
    console.log('danadao', req.file)
    const recipeById = await getRecipeById(req.params.id);
    const { _id: id, userId } = recipeById;
    if (req.payload.user._id !== recipeById.userId && req.payload.user.role !== 'admin') {
      return res.status(401).json({ message: 'missing auth token' });
    }
    recipeById.image = `localhost:3000/images/${req.file.filename}` ;
    const editedRecipe = await editRecipeById(id, recipeById, userId) 
    return res.status(200).json( editedRecipe )
  } catch (error) {
    return res.status(500).json(error);
  }
})

module.exports = recipesRouter;
