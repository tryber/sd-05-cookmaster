// const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const createRecipes = async (recipe) => connectionDB('recipes')
  .then((db) => db.insertOne(recipe))
  .then(() => ({
    recipe,
  }
  ));

const getAllRecipes = async () => connectionDB('recipes')
  .then((db) => db.find({}).toArray());

module.exports = { createRecipes, getAllRecipes };
