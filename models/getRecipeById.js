const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getRecipeById = async (id) =>
  connection().then(async (db) => {
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    if (!recipe) {
      return null;
    }
    return recipe;
  });

module.exports = getRecipeById;
