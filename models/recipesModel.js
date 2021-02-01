const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const getAllRecipes = async () =>
  getCollection('recipes')
    .then((recipes) => recipes.find().toArray());

const getRecipeById = async (id) => {
  const connection = await getCollection('recipes');

  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.findOne(ObjectId(id));
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const connection = await getCollection('recipes');
  const getRecipe = await getRecipeById(id);

  if (!getRecipe) return null;

  return connection.updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
};

const deleteRecipe = async (id) => {
  const connection = await getCollection('recipes');
  const getRecipe = await getRecipeById(id);

  if (!getRecipe) return null;

  return connection.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
