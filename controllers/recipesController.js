const { Router } = require('express');
const jwt = require('jsonwebtoken');
const autJWT = require('../service/autJWT');
const recipesService = require('../service/recipesService');

const recipesRouter = Router();

recipesRouter.post('/', autJWT, async (req, res) => {
  const recipe = req.body;
  const auth = req.headers.authorization;
  const secret = 'segredo';
  const payload = jwt.verify(auth, secret);
  const userId = payload.sub;
  try {
    const newRecipe = await recipesService.createRecipe(recipe, userId);

    if (newRecipe.err) {
      return res.status(newRecipe.statusCode).json({ message: newRecipe.message });
    }
    res.status(201).json({ recipe: newRecipe });
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = recipesRouter;
