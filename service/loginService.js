const model = require('../model/UserModel');

const loginService = async (body) => {
  const { email, password } = body;

  if (!email || !password) {
    return { error: true, message: 'All fields must be filled' };
  }

  const emailService = await model.emailModel(email);

  if (!emailService) {
    return { error: true, message: 'Incorrect username or password' };
  }

  if (password !== emailService.password) {
    return { error: true, message: 'Incorrect username or password' };
  }

  return emailService;
};

module.exports = {
  loginService,
};
