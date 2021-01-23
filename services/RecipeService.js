const RecipeModel = require('../models/RecipeModel');
const ThrowMyError = require('../middlewares/configError');

/*  ********************************************************************************************* */
const Validation = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    throw new ThrowMyError('Invalid entries. Try again', 'invalid_entries');
  }

  return RecipeModel.add(name, ingredients, preparation, userId);
};

const getAll = async () => RecipeModel.getAll();

module.exports = { Validation, getAll };
