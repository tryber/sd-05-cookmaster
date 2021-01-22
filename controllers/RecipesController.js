const { Router } = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../auth/validateJWT');
const recipeService = require('../services/RecipeService');

// Router é agrupador de middlewares
const recipeRouter = Router();

/*  ********************************************************************************************* */
recipeRouter.post('/', validateJWT, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const recipe = await recipeService.Validation(name, ingredients, preparation, userId);
  res.status(201).json(recipe);
}));

module.exports = recipeRouter;

// 2 - Crie um endpoint para o login de usuários
// A rota deve ser (/login).

// A rota deve receber os campos Email e Senha e esses campos devem ser
// validados no banco de dados.

// Na configuração do JWT não use variáveis de ambientes para não ter
// conflito com o avaliador.

// Um token JWT deve ser gerado e retornado caso haja sucesso no login.
// No seu payload deve estar presente o id, email e role do usuário.

// O body da requisição deve conter o seguinte formato:

// {
//   "email": "string",
//   "password": "string"
// }