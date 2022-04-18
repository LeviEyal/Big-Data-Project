const axios = require('axios');
require("dotenv").config();

const BIGML_AUTH = process.env.BIGML_AUTH;

const buildModel = async (req, res) => {
    try {                
        const source = await axios.post(`https://bigml.io/andromeda/source?${BIGML_AUTH}`, {
            data: "a,b,c,d\n1,2,3,4\n5,6,7,8"
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        const dataset = await axios.post(`https://bigml.io/andromeda/dataset?${BIGML_AUTH}`, {
            source: source.data.resource
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        const model = await axios.post(`https://bigml.io/andromeda/model?${BIGML_AUTH}`, {
            dataset: dataset.data.resource
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        res.status(200).send(model.data.resource);
    } catch (error) {
        res.status(400).send(error);
    }
};

const predictCall = (req, res) => {

};


module.exports = {
    buildModel,
    predictCall
};