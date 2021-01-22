const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation }) => {
  const newRecipe = await connection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation }));

  const recipe = { _id: newRecipe.insertedId, name, ingredients, preparation };
  return { recipe };
};

// list all recipes if or a specific one
const listRecipes = async (recipeId) => (
  recipeId
    ? connection('recipes').then((recipes) => recipes.findOne({ _id: ObjectId(recipeId) }))
    : connection('recipes').then((recipes) => recipes.find().toArray())
);

const editRecipe = async ({ name, ingredients, preparation }, recipeId) => {
  const recipe = await listRecipes(recipeId);
  if (recipe) {
    await connection('recipes').then((recipes) => recipes.updateOne({ _id: ObjectId(recipeId) }, { $set: { name, ingredients, preparation } }));
    return listRecipes(recipeId);
  }
  return false;
};

const editRecipeImage = async (req) => {
  const { params: { id } } = req;
  const imageName = `${req.get('host')}/images/${id}.jpeg`;
  await connection('recipes').then((recipes) => recipes.updateOne({ _id: ObjectId(id) }, { $set: { image: imageName } }));
  return listRecipes(req.params.id);
};

const deleteRecipe = async (recipeId) => connection('recipes').then((recipes) => recipes.deleteOne({ _id: ObjectId(recipeId) }));

module.exports = { listRecipes, createRecipe, editRecipe, deleteRecipe, editRecipeImage };
