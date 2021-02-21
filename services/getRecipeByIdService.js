const getRecipeById = require('../models/getRecipeById');

const getRecipeByIdService = async (id) =>
  getRecipeById(id);

module.exports = getRecipeByIdService;
