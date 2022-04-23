const express = require("express");
const cors = require("cors");
require("dotenv").config();

const controller = require("./controller/simulator.controller");
const customersController = require("./controller/customers.controller");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.post("/api/calls", controller.sendMessage)
    .post("/api/startSimulator", controller.startSimulator)
    .post("/api/stopSimulator", controller.stopSimulator)
    .get("/api/simulatorStatus", controller.getSimulatorStatus)
    .post("/api/simulatorRate", controller.setSimulatorRate);

app
    .get("/api/customers", customersController.getCustomers)
    .get("/api/customer/:id", customersController.getCustomer)
    .post("/api/customer", customersController.createCustomer)
    .put("/api/customer/:id", customersController.updateCustomer)
    .delete("/api/customer/:id", customersController.deleteCustomer);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Message Broker started at http://localhost:${port}`);
});
