const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB;
const dbName = 'sec';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
function getDB() {

  return db;
}

async function connect() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = {
  connect,
  getDB
};

