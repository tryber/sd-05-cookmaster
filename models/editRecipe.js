const { ObjectId } = require('mongodb');
const connection = require('./connection');

const editRecipe = async (recipeResponse) => {
  const { id, name, ingredients, preparation, userId, image } = recipeResponse;
  connection().then(async (db) => {
    await db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId, image } },
    );
  });
  return { _id: id, name, ingredients, preparation, userId, image };
};

module.exports = editRecipe;
