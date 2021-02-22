const connection = require('./connection');

const create = async ({ userId, name, ingredients, preparation }) => {
  const newRecipe = await connection('recipes')
    .then((recipes) => recipes.insertOne({
      userId,
      name,
      ingredients,
      preparation,
    }))
    .catch((err) => {
      console.error(err);
      return null;
    });

  return {
    _id: newRecipe.insertedId,
    userId,
    name,
    ingredients,
    preparation,
  };
};

const list = async (id = null) => {
  const recipes = await connection('recipes')
    .then((_recipes) => {
      if (id) return _recipes.findOne({ id });
      return _recipes.find().toArray();
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  return recipes;
};

module.exports = {
  create,
  list,
};
