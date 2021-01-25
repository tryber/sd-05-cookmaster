const { ObjectId } = require('mongodb');
const RecipeModel = require('../models/RecipeModel');
const ThrowMyError = require('../middlewares/configError');

/*  ********************************************************************************************* */
const Validation = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    throw new ThrowMyError('Invalid entries. Try again.', 'invalid_entries');
  }

  return RecipeModel.add(name, ingredients, preparation, userId);
};

const getAll = async () => RecipeModel.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new ThrowMyError('recipe not found', 'invalid_id');
  }

  const recipe = RecipeModel.getById(id);
  if (!recipe) {
    throw new ThrowMyError('recipe not found', 'invalid_id');
  }

  return recipe;
};

module.exports = { Validation, getAll, getById };
