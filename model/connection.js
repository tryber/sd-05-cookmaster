const { MongoClient } = require('mongodb');

// github
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

// local
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

let connection = null;
const getConnection = async () => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db('Cookmaster');
};

module.exports = getConnection;
