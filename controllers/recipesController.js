const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { createRecipes } = require('../models');
const checkSRecipe = require('../middlewares/receipesMiddleware');

const recipesRouter = Router();

recipesRouter.post('/', checkSRecipe, async (req, res) => {
  try {
    const secret = 'secretPassword';
    const token = req.headers.authorization;
    const tokenValidation = jwt.verify(token, secret);
    // const user = await verifyEmail(tokenValidation.userData.email);

    const { name, ingredients, preparation, userId } = req.body;
    // const { _id: userId } = req.user;

    const recipe = await createRecipes({ name, ingredients, preparation, userId });
    // console.log(recipe)
    if (tokenValidation) {
      return res.status(201).json(recipe);
    }

    if (!token) {
      return res.status(401).json({
        message: 'missing auth token',
      });
    }
  } catch (error) {
    // console.log(error)
    res.status(401).json({ message: 'jwt malformed' });
  }
});

module.exports = recipesRouter;
