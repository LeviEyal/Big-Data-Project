const express = require("express");
const app = express();
const http = require('http').Server(app);
const socket = require("socket.io");

const controller = require("./controller");
const kafka = require("./Kafka.js");
const db = require("./RedisDB");

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app
.get("/", (req, res) => res.send("Stream Service"))
.post("/api/insertCall", controller.insertCall)
.get("/api/calls", controller.getAllCalls)
.get("/api/calls/:key", controller.getCall);

const io = socket(http);

io.on('connection', async client => {
  console.log('Client connected to socket');
  kafka.consumer.on("data", async (message) => {
    console.log("Message received from Kafka");
    const new_Call = JSON.parse(message.value);
    console.log(new_Call);
    try {
      const calls_data = await db.redis.json.GET("calls_data");

      calls_data.current_waiting_calls = new_Call.waiting_calls;
      calls_data.waiting_times.push(new_Call.waiting_time);
      calls_data.number_of_waiting_calls.push(new_Call.waiting_calls);
      calls_data.calls_per_topic[new_Call.topic]++;
      calls_data.calls_per_hour[new_Call.start_time]++;

      await db.redis.json.SET("calls_data", "$", calls_data);
      client.emit("calls", calls_data); 
    } catch (error) {
      console.log(error);
    }
  });
});

const callsPerHour = () => {
  
}
/* Start server */
const PORT = process.env.PORT || 3002;

http.listen(PORT, () =>
  console.log(`Stream Service listening at http://localhost:${PORT}`)
);
