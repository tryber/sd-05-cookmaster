const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;

let initialConnection = null;

const connectionDB = async (collectionName) => {
  initialConnection = initialConnection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return initialConnection.db(DB_NAME).collection(collectionName);
};

module.exports = connectionDB;
