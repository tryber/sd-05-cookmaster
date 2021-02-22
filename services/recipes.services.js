const { ObjectID } = require('mongodb');
const recipeModel = require('../models/recipe.js');
const { verifyToken } = require('../auth/token.auth');

const INVALID_ENTRIES = {
  message: 'Invalid entries. Try again.',
  status: 400,
};

const INVALID_TOKEN = {
  message: 'jwt malformed',
  status: 401,
};

const NOT_FOUND = {
  message: 'recipe not found',
  status: 404,
};

const createRecipe = async (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;

  const invalidData = !name || !ingredients || !preparation;
  if (invalidData) return next(INVALID_ENTRIES);

  const isTokenValid = await verifyToken(authorization);
  if (!isTokenValid) return next(INVALID_TOKEN);

  const { payload: { _id: userId } } = isTokenValid;
  req.data = await recipeModel.create({ userId, name, ingredients, preparation });
  next();
};

const listRecipes = async (req, _res, next) => {
  try {
    const { id } = req.params;
    if (id) req.data = await recipeModel.list(ObjectID(id));
    else req.data = await recipeModel.list();
    console.log(req.data);
    next();
  } catch {
    next(NOT_FOUND);
  }
};

module.exports = {
  createRecipe,
  listRecipes,
};
