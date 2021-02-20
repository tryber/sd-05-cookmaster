const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

async function createRecipe(name, ingredients, preparation, userId) {
  const recipe = await getConnection('recipes').then((db) => db.insertOne({ name, ingredients, preparation, userId }));
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

async function updateById(id, payload, userId) {
  const { name, ingredients, preparation } = payload;
  await getConnection('recipes').then((db) => db.updateOne({ _id: ObjectId(userId) }, { $set: { name, ingredients, preparation } }));
  return { _id: id, name, ingredients, preparation, userId };
}

async function deleteById(userId) {
  return getConnection('recipes').then((recipes) => recipes.deleteOne({ _id: ObjectId(userId) }));
}

module.exports = {
  createRecipe,
  getAll,
  findById,
  deleteById,
  updateById,
};
