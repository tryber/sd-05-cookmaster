const getConnection = require('./connection');
const { ObjectId } = require('mongodb');

const insertRecipe = async (name, quantity) => 
  getConnection()
    .then((db) => db.collection('recipes').insertOne({ name, quantity }))
    .catch((err) => console.log(err));

const findAllRecipes = async () =>
  getConnection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((products) => products.map(({_id, name, product}) => ({ id: _id, name, product })))
    .catch((err) => console.log(err));
    
const findById = async (id) =>
  getConnection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .catch((err) => console.log(err));

const findByName = async (name) =>
  getConnection()
    .then((db) => db.collection('recipes').findOne({ name }))
    .catch((err) => console.log(err));


const updateRecipe = async (id, name, quantity) => {
  getConnection()
    .then((db) =>
      db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .catch((err) => console.log(err));

const deleteRecipe = async (id) =>
  getConnection()
    .then((db) => db.collection('recipes').deleteOne({ _id: Object(id) }))
    .catch((err) => console.log(err));


module.exports = {
  insertRecipe,
  findAllRecipes,
  findByName,
  findById,
  updateRecipe,
  deleteRecipe,
};
