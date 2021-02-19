const jwt = require('jsonwebtoken');
const model = require('../models/userModel');

// Secret usado pra gerar o token
const segredo = 'teste2021';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, segredo);
    const user = await model.findUser(decoded.data.username);

    // Se não existir usuário logado retorna este erro
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Erro: Seu token é inválido' });
  }
};
