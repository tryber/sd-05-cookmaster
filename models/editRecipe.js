const { ObjectId } = require('mongodb');
const connection = require('./connection');

const editRecipe = async (id, name, ingredients, preparation, userId) => {
  connection().then(async (db) => {
    await db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    );
  });
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = editRecipe;
