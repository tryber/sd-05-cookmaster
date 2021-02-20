const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const recipesModel = require('../models/recipesModel');
const userModel = require('../models/usersModel');
const { authorizationToken } = require('../middlewares/authorizationToken');
const { recipesValidation } = require('../middlewares/recipesValidation');

// Upload de arquivos com Multer
const storage = multer.diskStorage({
  destination: (req, _file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const recipesRouter = express.Router();

// Requisito 3 - Crie um endpoint para o cadastro de receitas
recipesRouter.post(
  '/recipes',
  recipesValidation,
  rescue(async (req, res, _) => {
    try {
      const { authorization } = req.headers;
      const { name, ingredients, preparation } = req.body;
      const decode = await jwt.verify(authorization, 'tumpero');
      const user = await userModel.verifyEmail(decode.data.email);
      const recipe = await recipesModel.createRecipe(name, ingredients, preparation, user.id);
      return res.status(201).json({ recipe });
    } catch (err) {
      console.log(err.message);
    }
  }),
);

// Requisito 4 - Crie um endpoint para a listagem de receitas
recipesRouter.get(
  '/recipes',
  rescue(async (_req, res, _) => {
    try {
      const allRecipes = await recipesModel.getAllRecipes();
      return res.status(200).send(allRecipes);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

// Requisito 5 - Crie um endpoint para visualizar uma receita específica
recipesRouter.get(
  '/recipes/:id',
  rescue(async (req, res, _) => {
    try {
      const { id } = req.params;
      const recipeId = await recipesModel.searchRecipeById(id);
      if (recipeId === null) {
        return res.status(404).json({ message: 'recipe not found' });
      }
      return res.status(200).json(recipeId);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

// Requisito 7 - Crie um endpoint para a edição de uma receita
recipesRouter.put(
  '/recipes/:id',
  recipesValidation,
  rescue(async (req, res, _) => {
    try {
      const { id } = req.params;
      const { name, ingredients, preparation } = req.body;
      await recipesModel.editRecipe(id, name, ingredients, preparation);
      const upRecipe = await recipesModel.searchRecipeById(id);
      return res.status(200).json(upRecipe);
    } catch (err) {
      console.log(err.message);
    }
  }),
);

// Requisito 8 - Crie um endpoint para a exclusão de uma receita
recipesRouter.delete(
  '/recipes/:id',
  authorizationToken,
  rescue(async (req, res, _) => {
    try {
      const { id } = req.params;
      recipesModel.deleteRecipeById(id);
      return res.status(204).send();
    } catch (err) {
      return res.send(500).json(err.message);
    }
  }),
);

// Requisito 9 - Crie um endpoint para a adição de uma imagem a uma receita
// Requisito 10 - Crie um endpoint para acessar a imagem de uma receita
recipesRouter.use(express.static(`${__dirname}/uploads`));

recipesRouter.put(
  '/recipes/:id/image',
  authorizationToken,
  upload.single('image'),
  rescue(async (req, res) => {
    const { id } = req.params;
    await recipesModel.UpdateById(id, `localhost:3000/images/${id}.jpeg`);
    const recipe = await recipesModel.searchRecipeById(id);
    res.status(200).json(recipe);
  }),
);

module.exports = recipesRouter;
