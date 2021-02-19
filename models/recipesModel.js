// const { ObjectID } = require('mongodb');
const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const createRecipes = async (recipe) => connectionDB('recipes')
  .then((db) => db.insertOne(recipe))
  .then(() => ({
    recipe,
  }
  ));

const getAllRecipes = async () => connectionDB('recipes')
  .then((db) => db.find({}).toArray());

const getRecipeById = async (id) => connectionDB('recipes')
  .then((db) => db.findOne({ _id: ObjectID(id) }));

const editRecipeById = async (id, recipe, userId) => {
  const { name, ingredients, preparation, image = '' } = recipe;

  const recipeS = await connectionDB('recipes');

  await recipeS.updateOne(
    { _id: ObjectID(id) },
    { $set: { name, ingredients, preparation, image } },
  );

  return { _id: id, name, ingredients, preparation, userId, image };
};

const deleteRecipe = async (id) => connectionDB('recipes')
  .then((db) => db.deleteOne({ _id: ObjectID(id) }));

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
};
