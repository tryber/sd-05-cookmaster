const getCollection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const getAllRecipes = async () =>
  getCollection('recipes')
    .then((recipes) => recipes.find().toArray());

module.exports = {
  createRecipe,
  getAllRecipes,
};
