const express = require('express');
const multer = require('multer');

const middlewares = require('../middlewares');
const createUserController = require('../controllers/createUserController');
const userLoginController = require('../controllers/userLoginController');
const createRecipeController = require('../controllers/createRecipeController');
const getRecipesController = require('../controllers/getRecipesController');
const getRecipeByIdController = require('../controllers/getRecipeByIdController');
const editRecipeController = require('../controllers/editRecipeController');
const deleteRecipeController = require('../controllers/deleteRecipeController');
const updateImageController = require('../controllers/updateImageController');

const cookRouter = express.Router();
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

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
cookRouter.put('/recipes/:id/image', upload.single('image'), middlewares.authorization, updateImageController);

module.exports = cookRouter;
