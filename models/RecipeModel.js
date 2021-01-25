const { ObjectId } = require('mongodb');
const connection = require('./connection');

/*  ********************************************************************************************* */
const add = async (name, ingredients, preparation, userId) =>
  connection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({
      recipe: {
        name,
        ingredients,
        preparation,
        userId,
        _id: result.insertedId,
      },
    }));

const getAll = async () =>
  connection('recipes')
    .then((recipes) => recipes.find().toArray());

const getById = async (id) =>
  connection('recipes')
    .then((recipes) => recipes.findOne(ObjectId(id)));

const update = async (id, name, ingredients, preparation, userId) => {
  connection('recipes')
    .then((db) =>
      db.updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
  add,
  getAll,
  update,
  getById,
};
