const connection = require('./connection');

const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
    const db = await connection();
    const userInserted = await db.collection('users').insertOne({ name, email, password, role });
    console.log(userInserted);
    return { user: userInserted.ops[0] };
  } catch (err) {
    console.error('createUserModel', err.message);
  }
};

const getUserMail = async (email) => {
  try {
    const db = await connection();
    const user = await db.collection('users').findOne({ email });
    return user;
  } catch (err) {
    console.error('getUserEmail', err.message);
  }
};

module.exports = {
  createUser,
  getUserMail,
};
