const multer = require('multer');

const { Router } = require('express');

const rescue = require('express-rescue');

const recipes = Router();

const recipesService = require('../service/recipesService');

const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

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

recipes.get('/', async (_req, res) => {
  const getAll = await recipesService.getAll();
  return res.status(200).json(getAll);
});

recipes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await recipesService.getById(id);
    if (getById.error) {
      return res.status(getById.statusCode).json({ message: getById.message });
    }
    res.status(200).json(getById);
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

    const update = await recipesService.update(
      id,
      name,
      ingredients,
      preparation,
      userId,
    );
    if (update.error) {
      return res.status(update.statusCode).json({ message: update.message });
    }
    return res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
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

recipes.put('/:id/image', auth, upload.single('image'), rescue(async (req, res) => {
  const { id } = req.params;

  const image = await recipesService.single(id);

  return res.status(200).json(image);
}));

module.exports = recipes;
