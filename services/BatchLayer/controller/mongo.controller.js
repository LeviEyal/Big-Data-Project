const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_DB_URL);

const dbName = "test", collectionName = "phonecalls";

/**
 * @description Inserts a new call to the database
 */
const insertCall = async (req, res) => {
    const data = req.body;
    try {
        await client.connect();
        await client.db(dbName).collection(collectionName).insertOne(data);
        res.json({
            message: "Inserted",
        });
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
};

/**
 * @description Returns all calls from the database
 */
const getAllCalls = async (req, res) => {
    try {
        await client.connect();
        const all = await client
            .db(dbName)
            .collection(collectionName)
            .find()
            .toArray();
        res.json(all);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

/**
 * @description Deletes all calls from the database
 */
const deleteAllCalls = async (req, res) => {
    try {
        await client.connect();
        await client.db(dbName).collection(collectionName).deleteMany({});
        res.json({
            message: "All documents deleted",
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertCall,
    getAllCalls,
    deleteAllCalls,
};
