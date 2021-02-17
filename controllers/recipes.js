const express = require('express');
const rescue = require('express-rescue');
//VERIFICAR NOVO USUARIO
const router = express.Router();

const erroMsg = require('../middlewares/erroResponse');

// Endpoint para o cadastro de receitas

router.post(
	'/recipes',
	checkRecipe,
	rescue(async (req, res) => {
		const { name, ingredients, preparation } = req.body;
		const { _id: userId } = req.userPayload;

		const newRecipe = await RECIPESERVICES.create(name, ingredients, preparation, userId);
		if (!newRecipe) return res.status(400).json({ message: 'Recipe was not created' });
		return res.status(201).json(newRecipe);
	}),
);
