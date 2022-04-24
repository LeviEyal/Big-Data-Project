const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();

const controller = require("./controller/controller");
const kafkaConsumer = require("./model/Kafka");
const db = require("./database/RedisDB");
const { processData } = require("./model/CallsProcess");

/* Middlewares */
app.use(express.json());
app.use(require("cors")());

/* Routes */
app.get("/api/calls", controller.getAllCalls)
    .get("/api/calls/:key", controller.getCall)
    .post("/api/calls", controller.insertCall);
    
/*
    When the client is connected, then the StreamLayer service
    emits the current stored calls to the client. 
*/
io.on("connection", async (client) => {
    console.log("Client connected to socket");
    try {
        let calls_data = await db.redis.json.GET("calls_data");
        io.emit("calls", calls_data);
        console.log("calls data:", calls_data);
    } catch (error) {
        console.log(error);
    }
});

/* 
    Whenever this service is getting new phone calls from kafka,
    Then it process all the phone calls data required for the dashboard
    in the frontend tier, and emits it via web socket.
*/
kafkaConsumer.on("data", async (message) => {
    const new_Call = JSON.parse(message.value);
    try {
        let calls_data = await db.redis.json.GET("calls_data");
        calls_data = processData(new_Call, calls_data);
        await db.redis.json.SET("calls_data", "$", calls_data);
        await db.redis.json.ARRINSERT("All_calls", "$", 0, new_Call);
        io.emit("calls", calls_data);
        io.emit("last_call", new_Call);
    } catch (error) {
        console.log(error);
    }
});

/* Start server */
const PORT = process.env.PORT || 3002;
server.listen(PORT, () =>
    console.log(`Stream Service listening at http://localhost:${PORT}`)
);
