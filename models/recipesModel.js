const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

async function createRecipe(name, ingredients, preparation, userId) {
  const recipe = await getConnection('recipes').then((db) => db.insertOne({ name, ingredients, preparation, userId }));
  console.log(recipe);
  return recipe.ops[0];
}

async function getAll() {
  return getConnection('recipes').then((db) => db.find().toArray());
}

async function findById(userId) {
  if (ObjectId.isValid(userId)) {
    const recipe = getConnection('recipes').then((db) => db.findOne({ _id: ObjectId(userId) }));
    return recipe;
  }
  return null;
}

module.exports = {
  createRecipe,
  getAll,
  findById,
};
