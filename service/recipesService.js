const model = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }
  return model.create(name, ingredients, preparation, userId);
};

module.exports = {
  create,
};
