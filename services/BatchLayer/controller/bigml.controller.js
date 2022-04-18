const bigml = require("bigml");
const axios = require("axios");
const jsonfile = require("jsonfile");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_DB_URL);
const dbName = "test", collectionName = "phonecalls";

const connection = new bigml.BigML();
const source = new bigml.Source();
let modelId = "";

const makeJsonFile = async () => {
    try {
        // const allCalls = await axios.get(`http://localhost:3003/api/calls`);
        await client.connect();
        const all = await client
            .db(dbName)
            .collection(collectionName)
            .find()
            .toArray();
        client.close();
        const calls = all.map((call) => {
            return {
                duration: call.duration,
                name: call.name,
                phone: call.phone,
                age: call.age,
                gender: call.gender,
                city: call.city,
                lang: call.lang,
                product: call.product,
                topic: call.topic
            };
        });
        await jsonfile.writeFile("./callsData.json", calls, { spaces: 2 });
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * @description Builds a model from the data in the database
 */
const buildModel = async (req, res) => {
    await makeJsonFile();
    source.create("./callsData.json", function (error, sourceInfo) {
        if (!error && sourceInfo) {
            var dataset = new bigml.Dataset();
            dataset.create(sourceInfo, function (error, datasetInfo) {
                if (!error && datasetInfo) {
                    var model = new bigml.Model();
                    model.create(datasetInfo, function (error, modelInfo) {
                        if (!error && modelInfo) {
                          console.log(modelInfo);
                            res.status(200).json({
                                message: "Model built",
                                modelInfo: modelInfo.resource,
                            });
                            modelId = modelInfo.resource;
                        }
                        else {
                            res.status(500).send("Error creating model");
                        }
                    });
                }
                else {
                    res.status(400).send("Error creating dataset");
                }
            });
        }
        else {
            res.status(400).send("Error creating source");
        }
    });
};

/**
 * @description Predicts the call using the model
 */
const predictCall = (req, res) => {
    const callToPredict = req.body;
    const localModel = new bigml.LocalModel(modelId);
    localModel.predict(callToPredict, function (error, prediction) {
        res.status(200).send(prediction);
    });
};


module.exports = {
    buildModel,
    predictCall
};