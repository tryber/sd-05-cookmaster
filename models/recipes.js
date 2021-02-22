const { ObjectID } = require('mongodb');
const getCollection = require('./connection');

const newRecipes = async (name, ingredients, preparation, userId) => {
  const newRecipe = await getCollection('recipes').then(async (recipe) =>
    recipe.insertOne({ name, ingredients, preparation, userId }));
  return { recipe: { name, ingredients, preparation, userId, _id: newRecipe.insertedId } };
};

const getRecipes = async () =>
  getCollection('recipes').then(async (recipe) => recipe.find().toArray());

const getRecipesId = async (id) =>
  getCollection('recipes').then(async (recipe) => recipe.findOne({ _id: ObjectID(id) }));

const updateRecipes = async (id, name, ingredients, preparation, image) => {
  await getCollection('recipes').then((update) => update.updateOne({ _id: ObjectID(id) }, { $set: { name, ingredients, preparation, image } }));
  return { name, ingredients, preparation, id, image };
};

const deleteRecipe = async (id) =>
  getCollection('recipes').then(async (recipe) => recipe.deleteOne({ _id: ObjectID(id) }));

module.exports = { newRecipes, getRecipes, getRecipesId, updateRecipes, deleteRecipe };
