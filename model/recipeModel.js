const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  try {
    const db = await connection();
    const recipeInserted = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });
    console.log('linha 8 model', recipeInserted.ops[0]);
    return recipeInserted.ops[0];
  } catch (err) {
    console.error(err.message);
  }
};

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const allRecipes = await db.collection('recipes').find().toArray();
    return allRecipes;
  } catch (err) {
    console.error(err.message);
  }
};

const getRecipeById = async (id) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne(ObjectId(id));
    return recipe;
  } catch (err) {
    console.log(err.message);
  }
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    return recipe;
  } catch (err) {
    console.log(err.message);
  }
};

const deleteRecipe = async (id) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
    return recipe;
  } catch (err) {
    console.error(err.message);
  }
};

const uploadImage = async (id, destination) => {
  try {
    const db = await connection();
    const image = await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image: destination } });
    return image;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
