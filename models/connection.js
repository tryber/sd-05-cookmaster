const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let connection = null;

module.exports = async (collectionName) => {
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  connection = connection || await MongoClient.connect(MONGO_DB_URL, OPTIONS);
  return connection.db(DB_NAME).collection(collectionName);
};
