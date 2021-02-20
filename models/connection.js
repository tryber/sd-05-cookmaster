const { MongoClient } = require('mongodb');

const DB_NAME = 'Cookmaster';

// Conexão para realizar EVALUATOR
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

// conexão no banco local
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

let connection = null;

module.exports = async (colectionName) => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db(DB_NAME).collection(colectionName);
};
