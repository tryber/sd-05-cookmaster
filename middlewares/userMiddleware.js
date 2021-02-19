const { verifyEmail } = require('../models/usersModel');

const checkSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validação de campos: name, email e senha são obrigatórios
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  // função padrão para validar email
  const validateEmail = (emailField) => {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(String(emailField).toLowerCase());
  };

  // Validando se o campo email é inválido
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  // Validação de email único
  const existedEmail = await verifyEmail(email);
  if (existedEmail) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  next();
};

module.exports = checkSignUp;
