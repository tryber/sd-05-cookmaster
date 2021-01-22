const RecipeModel = require('../models/RecipeModel');
const ThrowMyError = require('../middlewares/configError');

/*  ********************************************************************************************* */
const Validation = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    throw new ThrowMyError('Invalid entries. Try again', 'invalid_entries');
  }

  return await RecipeModel.add(name, ingredients, preparation, userId);
};

module.exports = { Validation };
