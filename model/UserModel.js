const getColletion = require('./connection');

const createUserModel = async ({ name, email, password }) =>
  getColletion('users')
    .then((users) => users.insertOne({ name, email, password }))
    .then((results) => ({ name, email, role: 'user', _id: results.insertedId }));

const emailModel = async ({ email }) => {
  getColletion('users').then((user) => user.findOne({ email }));
};

module.exports = {
  createUserModel,
  emailModel,
};
