const { MongoClient } = require('mongodb');

const DB_NAME = 'Cookmaster';
//  local
// const MONGO_DB_URI = `mongodb://localhost:27017/${DB_NAME}`;
//  remoto
const MONGO_DB_URI = `mongodb://mongodb:27017/${DB_NAME}`;

let connection = null;

module.exports = async (collectionName) => {
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  connection = connection || (await MongoClient.connect(MONGO_DB_URI, OPTIONS));
  return connection.db(DB_NAME).collection(collectionName);
};
