const recipesModel = require('../models/recipesModel');

async function createRecipe(name, ingredients, preparation, userId) {
  if (!name || !ingredients || !preparation) {
    return { isError: true, message: 'Invalid entries. Try again.', status: 400 };
  }

  const recipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  console.log(recipe);
  return { name, ingredients, preparation, userId };
}

module.exports = {
  createRecipe,
};
