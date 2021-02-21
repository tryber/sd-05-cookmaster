const connection = require('./connection');

const getRecipes = async () =>
  connection()
    .then((db) => db.collection('recipes').find().toArray());

module.exports = getRecipes;
