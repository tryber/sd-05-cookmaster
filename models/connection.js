const { MongoClient } = require('mongodb');
require('dotenv').config();

let connection;

const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;

async function getCollection(collectionName) {
  connection = connection
  || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));

  return connection.db(DB_NAME).collection(collectionName);
}

module.exports = getCollection;
