// Cria uma nova instância ObjectId
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection('recipes').then((recipes) =>
    recipes.insertOne({ name, ingredients, preparation, userId }).then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    })));

const getAllRecipes = async () =>
  connection('recipes').then((recipes) => recipes.find({}).toArray());

const searchRecipeById = async (id) =>
  connection('recipes').then((recipes) => (ObjectId.isValid(id) ? recipes.findOne({ _id: ObjectId(id) }) : null));

const editRecipe = async (id, name, ingredients, preparation) =>
  connection('recipes').then((recipes) => (ObjectId.isValid(id) ? recipes.updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } })
    : null));

const UpdateById = async (id, url) => {
  connection('recipes').then((recipes) => (ObjectId.isValid(id) ? recipes.updateOne({ _id: ObjectId(id) }, { $set: { image: url } })
    : null));
};

const deleteRecipeById = async (id) => {
  connection('recipes').then((recipes) => (ObjectId.isValid(id) ? recipes.deleteOne({ _id: ObjectId(id) }) : null));
};

module.exports = {
  createRecipe,
  getAllRecipes,
  searchRecipeById,
  editRecipe,
  UpdateById,
  deleteRecipeById,
};
