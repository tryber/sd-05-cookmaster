const { ObjectID } = require('mongodb');
const getCollection = require('./connection');

const createRecipeModel = async (recipe) =>
  getCollection('recipes')
    .then((result) => result.insertOne(recipe))
    .then(() => ({
      recipe,
    }));

const showRecipeModel = async () =>
  getCollection('recipes').then((result) => result.find({}).toArray());

const showByIdModel = async (id) =>
  getCollection('recipes').then((result) => result.findOne({ _id: ObjectID(id) }));

const updateModel = async (id, recipe, userId) => {
  const { name, ingredients, preparation, image = '' } = recipe;

  const myRecipe = await getCollection('recipes');

  await myRecipe.updateOne(
    { _id: ObjectID(id) },
    { $set: { name, ingredients, preparation, image } },
  );

  return { _id: id, name, ingredients, preparation, userId, image };
};

const deleteRecipeModel = async (id) =>
  getCollection('recipes').then((result) => result.deleteOne({ _id: ObjectID(id) }));

module.exports = {
  createRecipeModel,
  showRecipeModel,
  showByIdModel,
  updateModel,
  deleteRecipeModel,
};
