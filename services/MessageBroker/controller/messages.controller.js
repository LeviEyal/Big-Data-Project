const kafka = require("../model/kafka");
const simulator = require("../model/simulator");

let id = -1;
let toggle = false;

// Gets call and send it to kafka
const sendMessage = (req, res) => {
    kafka.publishMessage(req.body);
    console.log("Message sent to Kafka");
    res.send("message was sent");
};

// Toggle auto mode
const toggleAutoMode = (req, res) => {
    if (toggle) {
        clearInterval(id);
        toggle = false;
        console.log("stop auto mode");
        res.send("stop auto");
    } else {
        toggle = true;
        id = setInterval(() => {
            const call = simulator.generateCall();
            kafka.publishMessage(call);
            console.log(call);
        }, 2000);
        console.log("start auto mode");
        res.send("start auto");
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