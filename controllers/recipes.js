const express = require('express');

const router = express.Router();

const validateJWT = require('../auth/validateJWT');

const recipesServices = require('../services/recipesServices');
const recipesModel = require('../models/recipesModel');

// Endpoint para o cadastro de receitas
// Requisito 3
router.post(
  '/',
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
  '/',
  (async (req, res) => {
    const recipe = await recipesModel.getAll();
    if (recipe.isError) return res.status(recipe.status).json({ message: recipe.message });
    return res.status(200).json(recipe);
  }),
);
// Requisito 5
router.get(
  '/:id',
  (async (req, res) => {
    const { id } = req.params;
    const recipe = await recipesModel.findById(id);
    if (!recipe) return res.status(404).json({ message: 'recipe not found' });
    return res.status(200).json(recipe);
  }),
);

// Requisito 7
router.put(
  '/:id',
  validateJWT,
  (async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const { name, ingredients, preparation } = req.body;

    const payload = { name, ingredients, preparation };
    const recipe = await recipesModel.updateById(id, payload, userId);
    if (!recipe) return res.status(404).json({ message: 'recipe not found' });
    return res.status(200).json(recipe);
  }),
);

// Requisito 8
router.delete(
  '/:id',
  validateJWT,
  (async (req, res) => {
    const { id } = req.params;
    await recipesModel.deleteById(id);
    return res.status(204).json({ message: 'deleted' });
  }),
);

module.exports = router;
