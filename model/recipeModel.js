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

const updateModel = async (id, { name, ingredients, preparation }, userId) => {
  if (!ObjectId.isValid(id)) return null;

  await getCollection('recipes').then((recipe) =>
    recipe.updateOne({ _id: Object(id) }, { $set: { name, ingredients, preparation, userId } })
  );
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
  createRecipeModel,
  showRecipeModel,
  showByIdModel,
  updateModel,
};
