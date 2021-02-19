const { getter } = require('../helpers/functions');
const getRecipes = require('../models/getRecipes');

const getRecipesService = async () =>
  getRecipes().then((elements) =>
    elements.map(({ _id, name, ingredients, preparation, userId }) =>
      getter({ _id, name, ingredients, preparation, userId })));

module.exports = getRecipesService;
