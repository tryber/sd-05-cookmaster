// const { createRecipes } = require('../models');

const checkRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

module.exports = checkRecipe;
