const { ObjectId } = require('mongodb');
const getRecipeByIdService = require('../services/getRecipeByIdService');

const getRecipeByIdController = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  const response = await getRecipeByIdService(id);

  if (!response) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(response);
};

module.exports = getRecipeByIdController;
