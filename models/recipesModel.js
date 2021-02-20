const getConnection = require('./connection');

async function createRecipe(name, ingredients, preparation, userId) {
  return getConnection('recipes').then((db) => db.insertOne({ name, ingredients, preparation, userId }));
}

async function getAll() {
  return getConnection('recipes').then((db) => db.find().toArray());
}

module.exports = {
  createRecipe,
  getAll,
};
