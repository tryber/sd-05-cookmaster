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

const getAllRecipes = async () =>
  getConnection().then(async (db) => {
    const recipes = await db.collection('recipes').find().toArray();
    return recipes;
  });

const getRecipe = async (id) =>
  getConnection().then(async (db) => {
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return recipe;
  });

module.exports = { insertNewRecipe, getAllRecipes, getRecipe };
