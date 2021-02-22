const Joi = require('@hapi/joi');

const newUserSchema = Joi.object({
  /* padrão .email obriga a ser um formato valido de email com no minimo
  2 dominios ex: teste@gmail.com ao inves de com um unico dominio como exemplo@io */
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'All fields must be filled',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'All fields must be filled',
  }),
});

const invalidData = {
  code: 'invalid_data',
  message: 'Invalid entries. Try again.',
};

module.exports = {
  newUserSchema,
  loginSchema,
  invalidData,
};

// transparencia: referencia de uso do JOI = https://www.youtube.com/watch?v=u9kxYilQ9l8&t=0s
// não funciona essa merda;
