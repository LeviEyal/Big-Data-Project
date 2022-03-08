const express = require("express");

const controller = require("./controller");
const kafka = require("./Kafka.js");
const db = require("./mongoDB.js");

const app = express();
const PORT = process.env.PORT || 3000;

/* Middlewares */
app.use(express.json());

/* Routes */
app
  .get("/", (req, res) => res.send("Hello World!"))
  .post("/insertToMongoDB", controller.insertToMongoDB)
  .get("/getAll", controller.getAll);

/* Kafka */
kafka.consumer.on("data", function (message) {
  const phoneCall = new db.PhoneCallModel(JSON.parse(message.value));
  phoneCall
    .save()
    .then(() => console.log("Inserted to MongoDB"))
    .catch((err) => console.log(err));
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Batch Layer listening at http://localhost:${PORT}`);
});
