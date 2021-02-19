const express = require('express');

const middlewares = require('../middlewares');
const createUserController = require('../controllers/createUserController');
const userLoginController = require('../controllers/userLoginController');
const createRecipeController = require('../controllers/createRecipeController');
const getRecipesController = require('../controllers/getRecipesController');
const getRecipeByIdController = require('../controllers/getRecipeByIdController');
const editRecipeController = require('../controllers/editRecipeController');
const deleteRecipeController = require('../controllers/deleteRecipeController');

const cookRouter = express.Router();

cookRouter.get('/', (_req, res) => {
  res.send();
});

cookRouter.post('/users', middlewares.createUserValidation, createUserController);
cookRouter.post('/login', middlewares.loginValidation, userLoginController);
cookRouter.post('/recipes', middlewares.authorization, middlewares.createRecipeValidation, createRecipeController);
cookRouter.get('/recipes', getRecipesController);
cookRouter.get('/recipes/:id', getRecipeByIdController);
cookRouter.put('/recipes/:id', middlewares.authorization, editRecipeController);
cookRouter.delete('/recipes/:id', middlewares.authorization, deleteRecipeController);

module.exports = cookRouter;
