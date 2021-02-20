const { ObjectId } = require('mongodb');
const recipeModel = require('../models/recipeModel');

const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  const result = await recipeModel.create(newRecipe);
  return !result
    ? res.status(500).json({ message: 'error on database' })
    : res.status(201).json({ message: 'New recipe created', recipe: result });
};

const getRecipes = async (_req, res) => {
  const result = await recipeModel.findAll();

  return !result
    ? res.status(500).json({ message: 'error on database' })
    : res.status(200).json(result);
};

const getRecipe = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(404).json({ message: 'recipe not found' });

  const result = await recipeModel.find(req.params.id);
  if (result == null) return res.status(404).json({ message: 'recipe not found' });

  return !result
    ? res.status(500).json({ message: 'error on database' })
    : res.status(200).json(result);
};

const updateRecipe = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'recipe not found' });

  const updatedRecipe = await recipeModel.update(new ObjectId(req.params.id), req.body);

  return !updatedRecipe
    ? res.status(500).json({ message: 'error on database' })
    : res.status(200).json(req.body);
};

const removeRecipe = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'recipe not found' });

  const removedRecipe = await recipeModel.remove(new ObjectId(req.params.id));

  return !removedRecipe
    ? res.status(500).json({ message: 'error on database' })
    : res.status(204).json(req.body);
};

module.exports = {
  createRecipe,
  updateRecipe,
  removeRecipe,
  getRecipes,
  getRecipe,
};
