const connection = require('./connection');

const add = async ({ name, email, password }) => {
  const db = await connection('users');
  const result = await db.insertOne({ name, email, password, role: 'user' });

  return result.ops[0];
};

const findEmail = async (email) => {
  const db = await connection('users');
  const result = await db.findOne({ email });

  return result;
};

module.exports = {
  add,
  findEmail,
};
