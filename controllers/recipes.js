const express = require('express');

const router = express.Router();

const validateJWT = require('../auth/validateJWT');

const recipesServices = require('../services/recipesServices');
const recipesModel = require('../models/recipesModel');

// Endpoint para o cadastro de receitas
// Requisito 3
router.post(
  '/recipes',
  validateJWT,
  (async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    const newRecipe = await recipesServices.createRecipe(name, ingredients, preparation, userId);
    console.log(newRecipe);
    if (newRecipe.isError) return res.status(newRecipe.status).json({ message: newRecipe.message });
    return res.status(201).json({ recipe: newRecipe });
  }),
);
// Requisito 4
router.get(
  '/recipes',
  (async (req, res) => {
    const recipe = await recipesModel.getAll();
    if (recipe.isError) return res.status(recipe.status).json({ message: recipe.message });
    return res.status(200).json(recipe);
  }),
);
// Requisito 5
router.get(
  '/recipes/:id',
  (async (req, res) => {
    const { id } = req.params;
    const recipe = await recipesModel.findById(id);
    console.log(recipe);
    console.log(id);
    if (!recipe) return res.status(404).json({ message: 'recipe not found' });
    return res.status(200).json(recipe);
  }),
);

module.exports = router;
