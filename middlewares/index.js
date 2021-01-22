const validateFields = require('./validateFields');
const createToken = require('./createJWT');
const auth = require('./auth');

module.exports = { validateFields, createToken, auth };
