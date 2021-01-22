const { Router } = require('express');
const rescue = require('express-rescue');

// Router é agrupador de middlewares
const LoginService = require('../services/LoginService');
const loginRouter = Router();


/*  ********************************************************************************************* */
loginRouter.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await LoginService.getUser(email, password);
  res.status(200).json({ token });
}));

module.exports = loginRouter;

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