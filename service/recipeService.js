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

const showByIdService = async (id) => {
  const recipeModel = await recipeModel.showByIdModel(id);

  if (!recipeModel) {
    return { error: true, message: 'recipe not found' };
  }

  return recipeModel;
};

const updateService = async (req) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  return model.updateModel(id, req.body, userId);
};

module.exports = {
  createRecipeService,
  showRecipeService,
  showByIdService,
  updateService,
};
