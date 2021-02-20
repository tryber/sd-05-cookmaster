const express = require('express');

const router = express.Router();

const validateJWT = require('../auth/validateJWT');

const recipesServices = require('../services/recipesServices');

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

module.exports = router;
