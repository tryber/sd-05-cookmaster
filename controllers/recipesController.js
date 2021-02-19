const { Router } = require('express');

const recipes = Router();

const recipesService = require('../service/usersService');

const auth = require('../middlewares/auth');

recipes.post('/', auth, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id: userId } = req.user;
    const newRecipe = await recipesService.create(
      name,
      ingredients,
      preparation,
      userId,
    );

    if (newRecipe.error) {
      return res
        .status(newRecipe.statusCode)
        .json({ message: newRecipe.message });
    }
    res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = recipes;
