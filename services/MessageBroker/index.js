const express = require("express");

const kafka = require("./kafka");
const simulator = require("./simulator");

const port = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app
  .get("/", (req, res) => res.send("Welcome to the Stream Service"))
  .post("/api/sendMessage", (req, res) => {
    kafka.publishMessage(req.body);
    console.log("Message sent to Kafka");
    res.send("message was sent");
  });

setInterval(() => {
  const call = simulator.generateCall();
  kafka.publishMessage(call);
  console.log(call);
}, 5000);

// Start the server
app.listen(port, () =>
  console.log(`Message Broker started at http://localhost:${port}`)
);
