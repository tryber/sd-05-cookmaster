const { ObjectId } = require('mongodb');

const cookMasterCollection = require('./connection');

const create = async (name, ingredients, preparation, userId) =>
  cookMasterCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const getAll = async () =>
  cookMasterCollection('recipes')
    .then((recipe) => recipe.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return cookMasterCollection('recipes')
    .then((recipe) => recipe.findOne({ _id: ObjectId(id) }));
};

const update = async (id, name, ingredients, preparation, userId) => {
  if (!ObjectId.isValid(id)) return null;
  cookMasterCollection('recipes').then((recipe) =>
    recipe.updateOne({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId } }));
  return { _id: id, name, ingredients, preparation, userId };
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return cookMasterCollection('recipes')
    .then((result) => result.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getAll,
  update,
  getById,
  deleteRecipe,
};
