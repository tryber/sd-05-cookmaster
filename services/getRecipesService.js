const { getter } = require('../helpers/functions');
const getRecipes = require('../models/getRecipes');

const getRecipesController = async () =>
  getRecipes().then((elements) =>
    elements.map(({ _id, name, ingredients, preparation, userId }) =>
      getter({ _id, name, ingredients, preparation, userId })));

module.exports = getRecipesController;
