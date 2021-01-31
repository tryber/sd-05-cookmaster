// const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const createRecipes = async (name, ingredients, preparation) => connectionDB('recipes')
  .then((db) => db.insertOne({ name, ingredients, preparation }))
  .then((result) => ({
    recipe: {
      name,
      ingredients,
      preparation,
      _id: result.insertedId,
    }
}));

module.exports = { createRecipes };
