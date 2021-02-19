const getCollection = require('./connection');

const createRecipeModel = async ({ name, ingredients, preparation }, userId) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((results) => ({ name, ingredients, preparation, userId, _id: results.insertedId }));

const showRecipeModel = async () => getCollection('recipes').then((recipe) => recipe.find().toArray());

module.exports = {
  createRecipeModel,
  showRecipeModel,
};