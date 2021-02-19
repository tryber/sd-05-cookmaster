const jwt = require('jsonwebtoken');
const model = require('../model/recipeModel');

const senha = 'senhaSecreta';

const createRecipeService = async (req) => {
  const { name, ingredients, preparation } = req.body;
  const requisicao = req.headers.authorization;

  if (!name || !ingredients || !preparation) {
    return { error: true, message: 'Invalid entries. Try again.' };
  }

  if (!requisicao) {
    return { error: true, message: 'jwt malformed' };
  }

  try {
    const payload = jwt.verify(requisicao, senha);

    if (typeof payload === 'string') {
      return { error: true, message: 'jwt malformed' };
    }

    return model.createRecipeModel(req.body, payload.sub);
  } catch (err) {
    return { error: true, message: 'jwt malformed' };
  }
};

const showRecipeService = async () => model.showRecipeModel();

module.exports = {
  createRecipeService,
  showRecipeService,
};