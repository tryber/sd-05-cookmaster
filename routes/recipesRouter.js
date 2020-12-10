const { Router } = require('express');
const controllers = require('../controllers/index');
const middlewares = require('../middlewares/index');

const recipesRouter = Router();

recipesRouter.get('/', controllers.recipes.listRecipes);
recipesRouter.post('/', middlewares.authorization(), controllers.recipes.createRecipe);
recipesRouter.get('/:id', controllers.recipes.showRecipe);

module.exports = recipesRouter;
