const { getter } = require('../helpers/functions');
const createRecipe = require('../models/createRecipe');

const createRecipeService = async (name, ingredients, preparation, userId) =>
  createRecipe(name, ingredients, preparation, userId)
    .then((recipe) => getter({
      _id: recipe.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    }));

module.exports = createRecipeService;
