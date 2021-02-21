const { ObjectId } = require('mongodb');
const connection = require('./connection');

const deleteRecipe = async (id) => {
  connection().then(async (db) => {
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = deleteRecipe;
