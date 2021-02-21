// Requisito 9 e 10 feitos com consulta ao PR da Juliette Beaudet (git: juliettebeaudet)
// e consulta ao PR da Carla Nakajuni (git: carlanakajuni)

const editRecipe = require('./editRecipe');
const getRecipeById = require('./getRecipeById');

const updateImage = async (id) => {
  const recipeById = await getRecipeById(id);
  recipeById.image = `localhost:3000/images/${id}.jpeg`;
  const editedRecipe = await editRecipe(recipeById);
  return editedRecipe;
};

module.exports = updateImage;
