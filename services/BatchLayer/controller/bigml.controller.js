const bigml = require("bigml");
const axios = require("axios");
const jsonfile = require("jsonfile");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_DB_URL);
const dbName = "test",
    collectionName = "phonecalls";

const connection = new bigml.BigML();
const source = new bigml.Source();
let modelInfo = {};

const makeJsonFile = async () => {
    try {
        // const allCalls = await axios.get(`http://localhost:3003/api/calls`);
        await client.connect();
        const all = await client
            .db(dbName)
            .collection(collectionName)
            .find()
            .limit(1200)
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
                topic: call.topic,
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
                    model.create(datasetInfo, function (error, model) {
                        if (!error && model) {
                            console.log(model);
                            res.status(200).json({
                                message: "Model built",
                                modelInfo: model,
                            });
                            modelInfo = model;
                        } else {
                            res.status(500).send("Error creating model");
                        }
                    });
                } else {
                    res.status(400).send("Error creating dataset");
                }
            });
        } else {
            res.status(400).send("Error creating source");
        }
    });
};

/**
 * @description Predicts the call using the model
 */
const predictCall = (req, res) => {
    console.log("modelInfo", modelInfo);
    console.log("callToPredict", req.body);
    const callToPredict = req.body;
    const prediction = new bigml.Prediction();
    prediction.create(
        modelInfo,
        callToPredict,
        function (error, predictionInfo) {
            if (!error && predictionInfo) {
                res.status(200).json({
                    message: "Prediction made",
                    predictionInfo: predictionInfo,
                });
                console.log(predictionInfo);
            } else {
                res.status(500).send("Error making prediction");
            }
        }
    );
};

/**
 * @description Gets the model info
 */
const getModelInfo = (req, res) => {
    console.log("gettting model info");
    if (modelInfo.resource) {
        res.status(200).json({
            message: "Model info",
            modelInfo: modelInfo,
        });
    } else {
        res.status(400).send("Model not built");
    }
};

module.exports = {
    buildModel,
    predictCall,
    getModelInfo,
};
