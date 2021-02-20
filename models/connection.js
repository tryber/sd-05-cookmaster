const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'Cookmaster';
const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;

let connection = null;
const getConnection = async () => {
  connection = connection || await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await connection.db(DB_NAME);
  return db;
};

module.exports = getConnection;
