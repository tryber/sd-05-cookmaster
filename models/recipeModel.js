const { ObjectId } = require('mongodb');
const mongo = require('./mongoConnection');

const find = async (params) => {
  try {
    const db = await mongo.getConnection('recipes');
    if (ObjectId.isValid(params)) { 
    const recipe = await db.findOne({_id: ObjectId(params)});
    return recipe
  }
  return null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const findAll = async () => {
  try {
    const db = await mongo.getConnection('recipes');
    const result = [];
    await db
      .find()
      .forEach((element) => {
        result.push(element);
      });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const create = async (newRecipe) => {
  try {
    const db = await mongo.getConnection('recipes');
    const createdRecipe = await db.insertOne(newRecipe);
    return createdRecipe.ops[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (recipeId, recipe) => {
  try {
    const db = await mongo.getConnection('recipes');
    const result = await db.updateOne({ _id: recipeId }, { $set: recipe });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (recipeId) => {
  try {
    const db = await mongo.getConnection('recipes');
    const recipeToRemove = await db.deleteOne({ _id: recipeId });
    return recipeToRemove;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const uploadImage = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongo.getConnection('recipes');
  const path = `localhost:3000/images/${id}.jpeg`;

  await db.updateOne({ _id: ObjectId(id) }, { $set: { image: path } });

  return
};

module.exports = {
  find,
  create,
  update,
  remove,
  findAll,
  uploadImage,
};
