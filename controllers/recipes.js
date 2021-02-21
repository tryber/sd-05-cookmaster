const { Router } = require('express');
const multer = require('multer');
const { verifyToken } = require('../midlewares/jwt');
const recipesServices = require('../services/recipes');

const recipesRouter = Router();

recipesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.getRecipe(id);
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(404).json({ message: 'recipe not found' });
  }
});

recipesRouter.get('/', async (_req, res) => {
  try {
    const recipes = await recipesServices.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Estamos fora do ar. Tente novamente mais tarde' });
  }
});

recipesRouter.post('/', verifyToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.payload;
  try {
    const recipe = await recipesServices.insertNewRecipe(
      name,
      ingredients,
      preparation,
      userId,
    );
    return res.status(201).json(recipe);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
});

recipesRouter.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await recipesServices.deleteRecipe(id);
    return res.status(204).json({ message: 'Deu bom' });
  } catch (error) {
    return res.status(500).json({ message: 'Deu ruim' });
  }
});

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callBack) => {
    const { id } = req.params;
    callBack(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

recipesRouter.put(
  '/:id/image',
  verifyToken,
  upload.single('image'),
  async (req, res) => {
    const { id: recipeId } = req.params;
    const { payload, file } = req;
    const imagePath = `localhost:3000/images/${file.filename}`;
    try {
      const recipe = await recipesServices.uploadPhoto(
        recipeId,
        payload,
        imagePath,
      );
      return res.status(200).json(recipe);
    } catch (err) {
      return res.status(400).json({ message: 'Deu ruim' });
    }
  },
);

recipesRouter.put('/:id', verifyToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id: recipeId } = req.params;
  const { payload } = req;
  const recipeParams = { name, ingredients, preparation, recipeId };
  try {
    const recipe = await recipesServices.updateRecipe(recipeParams, payload);
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(400).json({ message: 'Deu ruim' });
  }
});

module.exports = recipesRouter;
