const createRecipeService = require('../services/createRecipeService');

const createRecipeController = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const response = await createRecipeService(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: response });
};

module.exports = createRecipeController;
