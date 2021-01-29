/* eslint-disable no-undef */
const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const insertRecipe = (name, ingredients, preparation) =>
  getConnection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
    .then((result) => result.ops[0])
    .catch((err) => console.log(err));

const findAllRecipes = () =>
  getConnection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((products) => products.map(({ _id, name, ingredients, preparation, userId }) =>
      ({ id: _id, name, ingredients, preparation, userId })))
    .catch((err) => console.log(err));

const findById = (id) =>
  getConnection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .catch((err) => console.log(err));

const updateRecipe = (id, name, ingredients, preparation) =>
  getConnection()
    .then((db) =>
      db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
    .catch((err) => console.log(err));

const deleteRecipe = (id) =>
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
