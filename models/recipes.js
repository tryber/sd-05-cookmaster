const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const insertNewRecipe = async (name, ingredients, preparation, userId) =>
  getConnection().then(async (db) => {
    const newRecipe = await db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId });
    const recipe = {
      recipe: {
        name,
        ingredients,
        preparation,
        userId,
        _id: newRecipe.insertedId,
      },
    };
    return recipe;
  });

const updateRecipe = async (
  name,
  ingredients,
  preparation,
  recipeId,
  image = '',
) => {
  const teste = await getConnection().then(async (db) => {
    await db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(recipeId) },
        { $set: { name, ingredients, preparation, image } },
      );
    return { name, ingredients, preparation, _id: recipeId, image };
  });
  return teste;
};
const getAllRecipes = async () =>
  getConnection().then(async (db) => {
    const recipes = await db.collection('recipes').find().toArray();
    return recipes;
  });

const getRecipe = async (id) =>
  getConnection().then(async (db) => {
    const recipe = await db
      .collection('recipes')
      .findOne({ _id: ObjectId(id) });
    return recipe;
  });

const deleteRecipe = async (id) =>
  getConnection().then(async (db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }),
  );

module.exports = {
  insertNewRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
