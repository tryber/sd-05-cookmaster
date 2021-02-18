const { ObjectId } = require('mongodb');
const getColletion = require('./connection');

const createUserModel = async ({ name, email, password }) =>
  getColletion('users')
    .then((users) => users.insertOne({ name, email, password }))
    .then((results) => ({ name, email, role: 'user', _id: results.insertedId }));

const emailModel = async (email) => {
  getColletion('users').then((users) => users.findOne({ email }));
};

const idModel = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return getColletion('users').then((users) => users.findOne(ObjectId(id)));
};

module.exports = {
  createUserModel,
  emailModel,
  idModel,
};
