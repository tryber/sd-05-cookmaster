const mongo = require('./mongoConnection');

const find = async (params = null) => {
  try {
    const db = await mongo.getConnection();
    const recipe = await db.collection('recipes').findOne(params == null ? {} : params);
    return recipe;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const findAll = async () => {
  try {
    const db = await mongo.getConnection();
    const result = [];
    await db
      .collection('recipes')
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
    const db = await mongo.getConnection();
    const createdRecipe = await db.collection('recipes').insertOne(newRecipe);
    return createdRecipe.ops[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (recipeId, recipe) => {
  try {
    const db = await mongo.getConnection();
    const result = await db.collection('recipes').updateOne({ _id: recipeId }, { $set: recipe });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (recipeId) => {
  try {
    const db = await mongo.getConnection();
    const recipeToRemove = await db.collection('recipes').deleteOne({ _id: recipeId });
    return recipeToRemove;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  find,
  create,
  update,
  remove,
  findAll,
};
