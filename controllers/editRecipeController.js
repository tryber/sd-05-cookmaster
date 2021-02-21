// const { ObjectId } = require('mongodb');
const editRecipeService = require('../services/editRecipeService');

const editRecipeController = async (req, res) => {
  const { id } = req.params;

  // if (!ObjectId.isValid(id)) {
  //   return res.status(404).json({ message: 'recipe not found' });
  // }

  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipeResponse = {
    id,
    name,
    ingredients,
    preparation,
    userId,
  };

  const response = await editRecipeService(recipeResponse);

  if (!response) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(response);
};

module.exports = editRecipeController;
