// const { ObjectId } = require('mongodb');
const connection = require('./connection');

/*  ********************************************************************************************* */
const add = async (name, ingredients, preparation, userId) =>
  connection('recipe')
    .then((user) => user.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({  _id: result.insertedId, name, ingredients, preparation, userId }));

module.exports = {
  add,
};
