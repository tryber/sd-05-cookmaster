// const { ObjectID } = require('mongodb');
const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const createRecipes = async (recipe) => connectionDB('recipes')
  .then((db) => db.insertOne(recipe))
  .then(() => ({
    recipe,
  }
  ));

const getAllRecipes = async () => connectionDB('recipes')
  .then((db) => db.find({}).toArray());

const getRecipeById = async (id) => connectionDB('recipes')
  .then((db) => db.findOne({ _id: ObjectID(id) }));

const editRecipeById = async (id, recipe) => connectionDB('recipes')
  .then((db) => db.updateOne({ _id: ObjectID(id) }, { $set: { recipe } }));

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
};
