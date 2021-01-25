// const { ObjectId } = require('mongodb');
const connection = require('./connection');

/*  ********************************************************************************************* */
const add = async (name, ingredients, preparation, userId) =>
  connection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    }));

const getAll = async () =>
  connection('recipes')
    .then((recipes) => recipes.find().toArray());

module.exports = {
  add,
  getAll,
};
