// const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const createRecipes = async (recipe) => connectionDB('recipes')
  .then((db) => db.insertOne(recipe))
  .then(() => ({
    recipe,
  }
  ));

module.exports = { createRecipes };
