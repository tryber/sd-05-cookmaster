const express = require('express');

const router = express.Router();

const validateJWT = require('../auth/validateJWT');

const recipesServices = require('../services/recipesServices');
const recipesModel = require('../models/recipesModel');

// Endpoint para o cadastro de receitas

router.post(
  '/recipes',
  validateJWT,
  (async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    const newRecipe = await recipesServices.createRecipe(name, ingredients, preparation, userId);
    if (newRecipe.isError) return res.status(newRecipe.status).json({ message: newRecipe.message });
    return res.status(201).json({ recipe: newRecipe });
  }),
);

router.get(
  '/recipes',
  (async (req, res) => {
    const recipe = await recipesModel.getAll();
    if (recipe.isError) return res.status(recipe.status).json({ message: recipe.message });
    return res.status(200).json(recipe);
  }),
);

module.exports = router;
