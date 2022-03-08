const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();

const client = new MongoClient(
  process.env.MONGO_DB_URL,
);

async function insertToMongoDB(req, res) {
  const data = req.body;
  try {
    await client.connect();
    await client.db("myDB").collection("myCollection").insertOne(data);
    const result = await client.db("myDB").collection("myCollection").findOne(data);
    res.json(result);
  }
  catch(error) {
    console.log(error);
  }
  finally {
    client.close();
  }
}

async function getAll(req, res) {
  try {
    await client.connect();
    const all = await client.db("myDB").collection("myCollection").find().toArray();
    res.json(all);
    client.close();
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  insertToMongoDB,
  getAll,
};
