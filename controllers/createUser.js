// const jwt = require('jsonwebtoken');
const { usersModel } = require('../models/usersModel');

// const secret = 'senha para entrar';

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const username = await usersModel.registerUser(email, password);

    if (!email || !password) {
      return res.status(422).json({ message: 'Missing fields' });
    }

    await usersModel.registerUser(email, password);

    res.status(201).json({ message: 'Novo usuário', user: username });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar o usuário no banco', err: error });
  }
};
