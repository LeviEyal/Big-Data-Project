const kafka = require("../model/kafka");
const simulator = require("../model/simulator");
const User = require("../model/User");

let intervalId = -1;
let toggle = false;

// Gets call and send it to kafka
const sendMessage = (req, res) => {
    kafka.publishMessage(req.body);
    console.log("Message sent to Kafka:", req.body);
    res.send("Message sent to Kafka:", req.body);
};

// Toggle auto mode
const toggleAutoMode = (req, res) => {
    if (toggle) {
        clearInterval(intervalId);
        toggle = false;
        console.log("************ Auto mode stopped ************");
        res.send("************ Auto mode stopped ************");
    } else {
        toggle = true;
        intervalId = setInterval(() => {
            const call = simulator.generateCall();
            kafka.publishMessage(call);
            call.start_time = new Date(call.start_time).toLocaleTimeString();
            call.end_time = new Date(call.end_time).toLocaleTimeString();
            call.duration = call.duration.toFixed(2) + " minutes";
            console.log(call);
        }, 4000);
        console.log("************ Auto mode started ************");
        res.send("************ Auto mode started ************");
    }
};

const autoMode = (req, res) => {
    console.log("auto mode status: " + toggle);
    res.send("sdikgkjhgkgjkg");
};

module.exports = {
    sendMessage,
    toggleAutoMode,
    autoMode
};