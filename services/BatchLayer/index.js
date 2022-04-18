const express = require("express");
const cors = require("cors");

const mongoController = require("./controller/mongo.controller");
const bigmlController = require("./controller/bigml.controller");
const kafkaConsumer = require("./model/Kafka");
const PhoneCallModel = require("./model/PhoneCallModel");

const app = express();
const PORT = process.env.PORT || 3003;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Routes */
app
  .get("/", (req, res) => res.send("Hello World!"))
  .post("/api/calls", mongoController.insertCall)
  .get("/api/calls", mongoController.getAllCalls)
  .delete("/api/calls", mongoController.deleteAllCalls)
  .get("/api/buildModel", bigmlController.buildModel)
  .get("/api/predictCall", bigmlController.predictCall);

/* Kafka */
kafkaConsumer.on("data", function (message) {
  const phoneCall = new PhoneCallModel(JSON.parse(message.value));
  phoneCall
    .save()
    .then(() => console.log("Inserted to MongoDB:", JSON.stringify(phoneCall).slice(0, 100)))
    .catch((err) => console.log(err));
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Batch Layer listening at http://localhost:${PORT}`);
});
