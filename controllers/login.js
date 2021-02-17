const express = require('express');
const rescue = require('express-rescue');
//VERIFICAR NOVO USUARIO
const router = express.Router();

const erroMsg = require('../middlewares/erroResponse');

// Endpoint para o login de usuários

router.post(
	'/login',
	checkUser,
	rescue(async (req, res) => {
		const { email, password } = req.body;
		// Verifica se é possível fazer o login
		const user = await LOGINSERVICES.login(email, password);
		if (!user) return res.status(400).json({ message: 'Unable to sign in' });
		//   Gera e retorna o token
		const token = await newToken(user);
		res.status(200).json({ token });
	}),
);
