const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  try {
    const db = await connection();
    const recipeInserted = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });
    return recipeInserted.ops[0];
  } catch (err) {
    console.err(err.message);
  }
};

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const allRecipes = await db.collection('recipes').find().toArray();
    return allRecipes;
  } catch (err) {
    console.err(err.message);
  }
};

const getRecipeById = async (id) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne(ObjectId(id));
    return recipe;
  } catch (err) {
    console.err(err.message);
  }
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipe').updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation }});
    return recipe;
  } catch (err) {
    console.err(err.message);
  }
};

const deleteRecipe = async (id) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipe').deleteOne({ _id: ObjectId(id) });
    return recipe;
  } catch (err) {
    console.err(err.message);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
