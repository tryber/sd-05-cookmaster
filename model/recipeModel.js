/* eslint-disable no-undef */
const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const insertRecipe = async (name, ingredients, preparation) =>
  getConnection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
    .then((result) => result.ops[0])
    .catch((err) => console.log(err));

const findAllRecipes = async () =>
  getConnection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((products) => products.map(({ _id, name, ingredients, preparation, userId }) =>
      ({ id: _id, name, ingredients, preparation, userId })))
    .catch((err) => console.log(err));

const findById = async (id) =>
  getConnection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .catch((err) => console.log(err));

const updateRecipe = async (_id, name, ingredients, preparation, userId) =>
  getConnection()
    .then((db) =>
      db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { _id, name, ingredients, preparation, userId } }))
    .catch((err) => console.log(err));

const deleteRecipe = async (id) =>
  getConnection()
    .then((db) => db.collection('recipes').deleteOne({ _id: Object(id) }))
    .catch((err) => console.log(err));

module.exports = {
  insertRecipe,
  findAllRecipes,
  findById,
  updateRecipe,
  deleteRecipe,
};
