const router = require('express').Router();
const recipeController = require('../controllers/recipeController');
const {
  validateNewRecipe,
  validateBeforeGetRecipe,
  validateBeforeUpdateRecipe,
} = require('../middlewares/validator');

router.post('/', validateNewRecipe, (req, res) => recipeController.createRecipe(req, res));
router.get('/', validateBeforeGetRecipe, (req, res) => recipeController.getRecipes(req, res));
router.get('/:id', validateBeforeGetRecipe, (req, res) => recipeController.getRecipe(req, res));
router.put('/:id', validateBeforeUpdateRecipe, (req, res) =>
  recipeController.updateRecipe(req, res));
router.delete('/:id', validateBeforeUpdateRecipe, (req, res) =>
  recipeController.removeRecipe(req, res));

module.exports = router;
