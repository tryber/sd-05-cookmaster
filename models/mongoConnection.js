const { MongoClient } = require('mongodb');

const env = 'local';
const MONGO_DB_URL = env === 'local' ? 'mongodb://localhost:27017/Cookmaster' : 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const getConnection = async () => {
  const connection = await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection.db(DB_NAME);
};

module.exports = { getConnection };
