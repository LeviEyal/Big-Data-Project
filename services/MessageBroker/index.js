const express = require("express");
const cors = require("cors");
require("dotenv").config();

const controller = require("./controller/messages.controller");

const port = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post("/api/sendMessage", controller.sendMessage)
    .post("/api/toggleAutoMode", controller.toggleAutoMode)
    .get("api/autoMode", controller.autoMode);

// Start the server
app.listen(port, () => {
    console.log(`Message Broker started at http://localhost:${port}`);
});