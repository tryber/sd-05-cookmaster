const { Router } = require('express');
const { createRecipe, listRecipes } = require('../services/recipes.services');

const recipes = Router();

recipes.post('/', createRecipe, (req, res) => {
  res.status(201).json({ recipe: req.data });
});

recipes.get('/', listRecipes, (req, res) => {
  res.status(200).json(req.data);
});

recipes.get('/:id', listRecipes, (req, res) => {
  res.status(200).json(req.data);
});

module.exports = recipes;
