const router = require('express').Router();
const multer = require('multer');
const recipeController = require('../controllers/recipeController');
const {
  validateNewRecipe,
  validateBeforeGetRecipe,
  validateBeforeUpdateRecipe,
} = require('../middlewares/validator');
const recipeModel = require('../models/recipeModel');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.post('/', validateNewRecipe, (req, res) => recipeController.createRecipe(req, res));
router.get('/', validateBeforeGetRecipe, (req, res) => recipeController.getRecipes(req, res));
router.get('/:id', validateBeforeGetRecipe, (req, res) => recipeController.getRecipe(req, res));
router.put('/:id', validateBeforeUpdateRecipe, (req, res) =>
  recipeController.updateRecipe(req, res));
router.delete('/:id', validateBeforeUpdateRecipe, (req, res) =>
  recipeController.removeRecipe(req, res));
router.put('/:id/image/', validateBeforeGetRecipe, upload.single('image'), async (req, res) => {
  const { id } = req.params;

  await recipeModel.uploadImage(id);

  const recipe = await recipeModel.find(id);

  return res.status(200).json(recipe);
});

module.exports = router;
