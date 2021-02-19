const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createRecipeModel = async ({ name, ingredients, preparation }, userId) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((results) => ({ name, ingredients, preparation, userId, _id: results.insertedId }));

const showRecipeModel = async () =>
  getCollection('recipes').then((recipe) => recipe.find().toArray());

const showByIdModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('recipes').then((recipe) => recipe.findOne(ObjectId(id)));
};

module.exports = {
  createRecipeModel,
  showRecipeModel,
  showByIdModel,
};
