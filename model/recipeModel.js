const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createRecipeModel = async ({ name, ingredients, preparation }, userId) =>
  getCollection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }))
    .then((results) => ({ name, ingredients, preparation, userId, _id: results.insertedId }));

const showRecipeModel = async () =>
  getCollection('recipes').then((recipes) => recipes.find({}).toArray());

const showByIdModel = async (id) => {
  getCollection('recipes').then((recipes) => recipes.findOne({ _id: ObjectId(id) }));
};

const updateModel = async (id, userId, recipe) => {
  const { name, ingredients, preparation, image = '' } = recipe;

  const myRecipe = await getCollection('recipes');

  await myRecipe.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation, image } },
  );

  return { _id: id, name, ingredients, preparation, userId, image };
};

const deleteRecipeModel = async (id) => getCollection('recipes').then((recipe) => recipe.deleteOne({ _id: ObjectId(id) }));
  
module.exports = {
  createRecipeModel,
  showRecipeModel,
  showByIdModel,
  updateModel,
  deleteRecipeModel,
};
