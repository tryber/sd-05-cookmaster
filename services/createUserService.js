const { getter } = require('../helpers/functions');
const createUser = require('../models/createUser');

const createUserController = async (name, email, password) =>
  createUser(name, email, password)
    .then((user) => getter({
      _id: user.insertedId,
      name,
      email,
      password,
      role: user.ops[0].role,
    }));

module.exports = createUserController;
