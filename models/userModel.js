const mongo = require('./mongoConnection');

const find = async (params = null) => {
  try {
    const db = await mongo.getConnection('users');
    const user = await db.findOne(params == null ? {} : params);
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const create = async (newUser) => {
  try {
    const db = await mongo.getConnection('users');
    const userToCreate = { ...newUser, role: 'user' };
    const createdUser = await db.insertOne(userToCreate);
    return createdUser.ops[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (userId, user) => {
  try {
    const db = mongo.getConnection();
    const userToUpdate = await db.collection('users').find({ _id: userId });
    const result = await db.collection('users').update(userToUpdate, user);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (user) => {
  try {
    const db = mongo.getConnection();
    const userToRemove = await db.collection('users').remove(user);
    return userToRemove;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  find,
  create,
  update,
  remove,
};
