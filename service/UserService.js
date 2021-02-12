// regex https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const model = require('../model/UserModel');

function emailIsValid(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

const createUserService = async (body) => {
  const { name, email, password } = body;
  const emailService = await model.emailModel(email);

  if (!name || !email || !password || !emailIsValid(email)) {
    throw { message: 'Invalid entries. Try again' };
  }

  return model.create(body);
};

module.exports = {
  createUserService,
};
