const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');
//payload, secret, header
const signature = 'master of puppets';
const header = { expiresIn: '8h', algorithm: 'HS256' };

const errorMessage = (message, code) => ({ err: { message, code } });

const createUser = async ({ name, email, password }) => {
  if (!name) {
    return errorMessage('Name is required', 'invalid_data');
  }
  if (!email) {
    return errorMessage('Email is require', 'invalid_data');
  }
  if (!password) {
    return errorMessage('Password is required', 'invalid_data');
  }
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(email).toLowerCase())) {
    return errorMessage('"email" invalid', 'invalid_data');
  }
  const checkEmail = await userModel.findByEmail(email);
  if (checkEmail) return errorMessage('This email already exists', 'invalid_data');

  return userModel.addUser(name, email, password);
};

const userLogin = async (email, password) => {
  const userData = await userModel.findByEmail(email);
  if (!userData) return errorMessage('Incorrect username or password', 'invalid_data');
  if (password !== userData.password) return errorMessage('Incorrect username or password 2', 'invalid_data');
  const token = jwt.sign(
    {
      name: userData.name,
      email: userData.email,
      role: userData.role,
    }, signature, header,
  );
  console.log('aqui no service', token);
  return { token };
};

module.exports = { createUser, userLogin };

// {
//   "user": {
//       "_id": "6011dc0fd3c1402ee4d68023",
//       "name": "Teste",
//       "email": "teste2@gmail.com",
//       "password": "asasasas",
//       "role": "user"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGUiLCJlbWFpbCI6InRlc3RlMkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTYxMTc4Nzg0MSwiZXhwIjoxNjExODE2NjQxfQ.lsBbNU-nhJzq6JBZGMOzvyiHNNKZ5XgHSot4k2bib3E"
// }